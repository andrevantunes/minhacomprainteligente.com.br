import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CartsService } from '../carts/carts.service';
import { OrdersService } from '../orders/orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../products/products.service';
import { PaymentTransactionAsaasService } from './paymentTransactionAsaas.service';
import { PaymentMailer } from './payment.mailer';
import { PropertiesService } from '../properties/properties.service';
import { toBrCurrency } from '../../utils/currency-helper';
import { I18nContext } from 'nestjs-i18n';
import {WalletsService} from "../wallets/wallets.service";
import {ReceivablesService} from "../receivables/receivables.service";

@ApiBearerAuth()
@ApiTags('Payments')
@Controller({ path: 'payments', version: '1' })
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
    private readonly paymentTransaction: PaymentTransactionAsaasService,
    private readonly paymentMailer: PaymentMailer,
    private readonly propertiesService: PropertiesService,
    private readonly receivablesService: ReceivablesService,
    private readonly walletsService: WalletsService,
  ) {}

  @Post()
  async create(@Req() request: any, @Res() response) {
    const {
      payment_method,
      recaptcha_token,
      hash,
      fingerprint,
      customer,
      card_number,
      card_holder,
      expire_date,
      cvv,
      billing_address,
    }: any = request.body;
    const valid = await this.recaptcha(recaptcha_token);

    if (!valid) {
      response.status(403);
      response.json({ error: 'invalid recaptcha' });
      return null;
    }

    const cart = await this.cartsService.cartWithProducts({
      where: { hash: hash },
    });

    const validProducts =
      await this.productsService.validateProductsFromProperty(
        cart.products,
        cart.property_id,
      );

    if (!validProducts) {
      response.status(403);
      response.json({ error: 'invalid product quantities' });
      return null;
    }
    this.paymentTransaction.setCode(hash);
    await this.paymentTransaction.setCustomer(
      this.customer(customer, hash, fingerprint),
    );
    this.paymentTransaction.setItemsFromCartProducts(cart.products);

    if (payment_method === 'credit_card') {
      this.paymentTransaction.setCreditCardPayment({
        number: card_number,
        holder_name: card_holder,
        expire_date: expire_date,
        cvv: cvv,
        billing_address: this.billingAddress(billing_address ?? {}),
      });
    }
    if (payment_method === 'pix') {
      this.paymentTransaction.setPixPayment();
    }
    const acquiredOrder = await this.paymentTransaction
      .executeTransaction()
      .then(async (acquiredResponse: any) => {
        if (acquiredResponse.encodedImage) {
          // TODO mudar para ficar livre para trodos os brokers
          acquiredResponse.qrImage = `data:image/png;base64, ${acquiredResponse.encodedImage}`;
          acquiredResponse.qrCode = acquiredResponse.payload;
        }
        if (response?.charges?.[0].last_transaction?.qr_code) {
          // TODO mudar para ficar livre para trodos os brokers
          acquiredResponse.qrImage =
            response?.charges?.[0].last_transaction?.qr_code_url;
          acquiredResponse.qrCode =
            response?.charges?.[0].last_transaction?.qr_code;
        }
        if (this.isPaid(acquiredResponse)) {
          await this.sendPaymentConfirmationNotifications(cart, payment_method);
          await this.removeProductsFromByCart(cart);
          await this.updateWallets(acquiredResponse, cart, payment_method);
        }
        if (acquiredResponse.status === 'failed') {
          return Promise.reject(acquiredResponse);
        }
        return acquiredResponse;
      })
      .catch((acquiredResponse) => {
        response.status(403);
        return acquiredResponse;
      });
    const order = await this.ordersService.createOrder({
      acquirer: this.paymentTransaction.ACQUIRED,
      acquirer_id: acquiredOrder.id,
      acquirer_metadata: { customer: acquiredOrder.customer },
      amount: cart.total_price,
      currency: acquiredOrder.currency,
      name: customer?.name,
      document_number: acquiredOrder.customer?.document,
      status: acquiredOrder.status?.toLowerCase() ?? 'pending',
      fingerprint,
      cart: {
        connect: {
          id: cart.id,
        },
      },
    });
    const acquirerPayment = this.paymentTransaction.paymentResult;
    if (acquirerPayment) {
      await this.paymentsService.createPayment({
        ...acquirerPayment,
        fingerprint,
        order: {
          connect: { id: order.id },
        },
      });
    } else {
      response.status(403);
    }
    response.json(acquiredOrder);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const payments = await this.paymentsService.payments({});
    return { payments };
  }
  private billingAddress({
    number,
    street,
    zip_code,
    city,
    state,
    country = 'BR',
  }: any = {}) {
    if (!zip_code) return null;
    const line_1 = `${number}, ${street}`;
    return {
      line_1,
      zip_code: zip_code.replace(/\D/, ''),
      city,
      state,
      country,
    };
  }

  private customer(
    customer: any = {},
    cartHash?: string,
    fingerprint?: string,
  ) {
    return {
      name: customer.name ?? `Venda direta: ${cartHash} - ${fingerprint}`,
      document: customer.document
        ? customer.document.replace(/\D/g, '')
        : '01529151090', //TODO add document da empresa neste caso
    };
  }

  private async recaptcha(token?: string, expectedAction = 'PAY') {
    if (!process.env.RECAPTCHA_USER_AUTH || !process.env.RECAPTCHA_SITE_KEY)
      return true;
    const siteKey = process.env.RECAPTCHA_SITE_KEY;
    return fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/minhacompraintel-1733872724443/assessments?key=${process.env.RECAPTCHA_USER_AUTH}`,
      {
        method: 'POST',
        body: JSON.stringify({ event: { token, expectedAction, siteKey } }),
      },
    )
      .then(async (r) => r.status === 200)
      .catch(() => false);
  }

  private isPaid(acquiredResponse: any): boolean {
    return ['paid', 'confirmed'].includes(
      acquiredResponse?.status.toLowerCase(),
    );
  }
  private async removeProductsFromByCart(cart) {
    return this.productsService.removeProductsFromProperty(
      cart.products,
      cart.property_id,
    );
  }

  private async updateWallets(acquiredResponse, cart, payment_method) {
    const tax = 0.1; //TODO pegar a partir das configurações do parceiro/empresa
    const currency = 'BRL';
    const wallet: any = await this.walletsService.findByPropertyId(
      cart.property_id,
      currency,
    ); //TODO resolver tipo
    const walletId = wallet.id;
    const amount = Math.round(acquiredResponse.value * 100 * (1 - tax));
    const settlementForecastAt = new Date(acquiredResponse.creditDate);
    if (payment_method === 'pix') {
      await this.walletsService.addAmount(walletId, amount);
    } else if (payment_method === 'credit_card') {
      await this.receivablesService.createReceivable(
        walletId,
        amount,
        currency,
        settlementForecastAt,
      );
    }
  }
  private async sendPaymentConfirmationNotifications(cart, billingType) {
    const property = await this.propertiesService.property(
      { id: cart.property_id },
      {
        include: {
          properties_managers: {
            include: {
              user: true,
            },
          },
        },
      },
    );
    const products = cart.products.map(
      (product: any) => `${product.quantity}x ${product.name}`,
    );
    const i18n = I18nContext.current();
    const translatedBillingType = i18n
      ? await i18n.t(`billing-type.${billingType}`)
      : billingType;
    const context = {
      propertyName: property.name,
      billingType: translatedBillingType,
      value: toBrCurrency(cart.total_price),
      product: products.join(' + '),
      products,
    };
    const emails = property.properties_managers
      .map(({ user }) => user.email)
      .filter((email) => email); // TODO filtrar unique também
    return this.paymentMailer.sendPaymentConfirmation(emails, context);
  }
}
