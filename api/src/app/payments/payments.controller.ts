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

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Payments')
@Controller({
  path: 'payments',
  version: '1',
})
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
    private readonly paymentTransaction: PaymentTransactionAsaasService,
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

    console.log('h1');
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
      // if (this.isTest()) {
      //   response.json(this.mockPixResponse());
      //   return undefined;
      // }
    }
    const acquiredOrder = await this.paymentTransaction
      .executeTransaction()
      .then((acquiredResponse: any) => {
        console.log('x1', acquiredResponse);
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
        if (acquiredResponse.status === 'failed') {
          return Promise.reject(acquiredResponse);
        }
        return acquiredResponse;
      })
      .catch((acquiredResponse) => {
        response.status(403);
        return acquiredResponse;
      });
    console.log('h5', acquiredOrder);
    console.log('h6', {
      acquirer: this.paymentTransaction.ACQUIRED,
      acquirer_id: acquiredOrder.id,
      acquirer_metadata: { customer: acquiredOrder.customer },
      amount: cart.total_price,
      currency: acquiredOrder.currency ?? 'BRL',
      name: acquiredOrder.customer?.name,
      document_number: acquiredOrder.customer?.document,
      status: acquiredOrder.status?.toLowerCase(),
      fingerprint,
      cart: {
        connect: {
          id: cart.id,
        },
      },
    });
    const order = await this.ordersService.createOrder({
      acquirer: this.paymentTransaction.ACQUIRED,
      acquirer_id: acquiredOrder.id,
      acquirer_metadata: { customer: acquiredOrder.customer },
      amount: cart.total_price,
      currency: acquiredOrder.currency,
      name: acquiredOrder.customer?.name,
      document_number: acquiredOrder.customer?.document,
      status: acquiredOrder.status?.toLowerCase() ?? 'pending',
      fingerprint,
      cart: {
        connect: {
          id: cart.id,
        },
      },
    });
    console.log('a2', order);
    const acquirerPayment = this.paymentTransaction.paymentResult;
    if (acquirerPayment) {
      console.log('h8', acquirerPayment);
      await this.paymentsService.createPayment({
        ...acquirerPayment,
        fingerprint,
        order: {
          connect: { id: order.id },
        },
      });
      // TODO remover do estoque
      void this.productsService.removeProductsFromProperty(
        cart.products,
        cart.property_id,
      );
    } else {
      response.status(403);
    }
    response.json(acquiredOrder);
  }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const payments = await this.paymentsService.payments({});
    return { payments };
  }
  //
  // @Get('/:hash(*)')
  // async findOne(@Param('hash') hash: string) {
  //   //TODO deve verificar se a pessoa tem acesso a página antes de devolver
  //   const cart = await this.cartsService.cartWithProducts({
  //     where: { hash: hash },
  //   });
  //   return { cart };
  // }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Put('/:hash(*)')
  // update(@Param('hash') hash: string, @Req() request: any) {
  //   const updatePageDto: any = request.body;
  //   return this.cartsService.updateCart({
  //     where: { hash },
  //     data: updatePageDto,
  //   });
  // }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Delete('/:path(*)')
  // remove(@Param('path') path: string) {
  //   return this.propertiesService.deletePage({ path });
  // }
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
      // email: customer.email ?? `${cartHash}-${fingerprint}@mci.com.br`,
      document: customer.document
        ? customer.document.replace(/\D/g, '')
        : '01529151090',
      // type: 'individual',
      // document_type: 'cpf',
      // phones: {
      //   mobile_phone: this.splitPhone(customer.phone),
      // },
    };
  }

  private splitPhone(phone) {
    const number =
      phone
        .replace(/\D/g, '')
        .replace(/^\+55/, '')
        .replace(/(\d{2})(\d{8}|\d{9})/, '$2') ?? '992472756';
    const area_code =
      phone
        .replace(/\D/g, '')
        .replace(/^\+55/, '')
        .replace(/(\d{2})(\d{8}|\d{9})/, '$1') ?? '51';
    return {
      number,
      country_code: '55',
      area_code,
    };
  }

  private mockPixResponse() {
    // TODO remover no futuro
    return {
      id: 'or_v1bkZk4xceiQ7Dy4',
      code: '1732916862330',
      amount: 1090,
      currency: 'BRL',
      closed: true,
      items: [
        {
          id: 'oi_520XWWcL8cRPXqLg',
          type: 'product',
          description: 'Cerveja Heineken 330ml',
          amount: 1090,
          quantity: 1,
          status: 'active',
          created_at: '2024-11-29T22:08:25Z',
          updated_at: '2024-11-29T22:08:25Z',
          code: '1',
        },
      ],
      customer: {
        id: 'cus_Ddq0jnJH9Hbjr6Jy',
        name: 'André Antunes Vieira',
        email: 'andre@minhacomprainteligente.com.br',
        document: '98968911096',
        document_type: 'cpf',
        type: 'individual',
        delinquent: false,
        created_at: '2024-11-29T21:27:46Z',
        updated_at: '2024-11-29T21:27:46Z',
        phones: {
          mobile_phone: {
            country_code: '55',
            number: '992472756',
            area_code: '51',
          },
        },
      },
      status: 'pending',
      created_at: '2024-11-29T22:08:25Z',
      updated_at: '2024-11-29T22:08:25Z',
      closed_at: '2024-11-29T22:08:25Z',
      charges: [
        {
          id: 'ch_XgQO3VQCbJt23RpG',
          code: '1732916862330',
          gateway_id: '3603723961',
          amount: 1090,
          status: 'pending',
          currency: 'BRL',
          payment_method: 'pix',
          created_at: '2024-11-29T22:08:25Z',
          updated_at: '2024-11-29T22:08:25Z',
          customer: {
            id: 'cus_Ddq0jnJH9Hbjr6Jy',
            name: 'André Antunes Vieira',
            email: 'andre@minhacomprainteligente.com.br',
            document: '98968911096',
            document_type: 'cpf',
            type: 'individual',
            delinquent: false,
            created_at: '2024-11-29T21:27:46Z',
            updated_at: '2024-11-29T21:27:46Z',
            phones: {
              mobile_phone: {
                country_code: '55',
                number: '992472756',
                area_code: '51',
              },
            },
          },
          last_transaction: {
            pix_provider_tid: '3603723961',
            qr_code:
              '00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/d1ab1cae-6ff9-4aed-9fb8-94a6e7229f3e520400005303986540510.905802BR5925DIGITAL FLUX ANTUNES ACAD6014RIO DE JANEIRO62290525126794236aad0b766fce68c826304743B',
            qr_code_url:
              'https://api.pagar.me/core/v5/transactions/tran_KAM46zKTLHka1bqX/qrcode?payment_method=pix',
            expires_at: '2024-11-30T22:08:25Z',
            id: 'tran_KAM46zKTLHka1bqX',
            transaction_type: 'pix',
            gateway_id: '3603723961',
            amount: 1090,
            status: 'waiting_payment',
            success: true,
            created_at: '2024-11-29T22:08:25Z',
            updated_at: '2024-11-29T22:08:25Z',
            gateway_response: {},
            antifraud_response: {},
            metadata: {},
          },
        },
      ],
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

  private isTest() {
    return String(process.env.PAGARME_API_KEY).match(/test/);
  }
}
