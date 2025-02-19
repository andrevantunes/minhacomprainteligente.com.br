import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  SerializeOptions,
  Req,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../orders/orders.service';
import { PaymentTransactionAsaasService } from '../payments/paymentTransactionAsaas.service';
import { PaymentMailer } from '../payments/payment.mailer';
import { PropertiesService } from '../properties/properties.service';
import { toBrCurrency } from '../../utils/currency-helper';
import { ProductsService } from '../products/products.service';
import { WalletsService } from '../wallets/wallets.service';
import { PaymentsService } from '../payments/payments.service';

@ApiBearerAuth()
@ApiTags('Carts')
@Controller({ path: 'carts', version: '1' })
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly paymentMailer: PaymentMailer,
    private readonly propertiesService: PropertiesService,
    private readonly walletsService: WalletsService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post()
  create(@Req() request: any) {
    const createPageDto: any = request.body;
    return this.cartsService.createCart(createPageDto);
  }

  @Get('/payment/:hash(*)')
  async findCartPayment(@Param('hash') hash: string) {
    const cart = await this.cartsService.cart({
      where: { hash: hash },
      include: { cart_products: { include: { product: true } } },
    });
    const order = await this.ordersService.order({
      where: { cart_id: cart.id },
      include: {
        payments: true,
      },
      orderBy: { id: 'desc' },
    });
    const acquirerOrder: any = {};
    if (order?.acquirer_id && order.status !== 'paid') {
      if (order.acquirer === 'asaas') {
        const acquirer = new PaymentTransactionAsaasService();
        const aquirerOrder = await acquirer.findPayment(order.acquirer_id);
        if (this.isPaid(aquirerOrder)) {
          order.status = 'paid';
          await this.ordersService.updateOrder(
            { id: order.id },
            { updated_at: new Date(), status: 'paid' },
          );
          const payment = await this.paymentsService.findByOrderId(order.id);
          await this.sendPaymentConfirmationNotifications(cart, order);
          await this.removeProductsFromByCart(cart);
          await this.updateWallets(aquirerOrder, cart, payment);
        }
      }
    }
    return { cart, order, acquirerOrder };
  }
  @Get('/:hash(*)')
  async findOne(@Param('hash') hash: string) {
    const cart = await this.cartsService.cartWithProducts({
      where: { hash: hash },
    });
    return { cart };
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Put('/:hash(*)')
  update(@Param('hash') hash: string, @Req() request: any) {
    const updatePageDto: any = request.body;
    return this.cartsService.updateCart(hash, updatePageDto);
  }
  private async removeProductsFromByCart(cart) {
    return this.productsService.removeProductsFromCart(cart);
  }

  private async updateWallets(acquiredResponse, cart, payment) {
    const currency = 'BRL';
    const wallet: any = await this.walletsService.findByPropertyId(
      cart.property_id,
      currency,
    ); //TODO resolver tipo
    const walletId = wallet.id;
    const amount = Math.round(
      acquiredResponse.value * 100 * (1 - wallet.processing_fee),
    );
    if (payment.method === 'pix') {
      await this.walletsService.addAmount(walletId, amount, payment.id);
    }
  }

  private isPaid(aquirerOrder: any): boolean {
    return ['received', 'paid'].includes(aquirerOrder?.status.toLowerCase());
  }
  private async sendPaymentConfirmationNotifications(cart, order) {
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
    const payment = order.payments?.[0] ?? { method: '?', amount: '?' };
    const products = cart.cart_products.map(
      (cart_product) =>
        `${cart_product.quantity}x ${cart_product.product.name}`,
    );
    const context = {
      propertyName: property.name,
      billingType: payment.method,
      value: toBrCurrency(payment.amount),
      product: products.join(', '),
    };
    const emails = property.properties_managers.map(({ user }) => user.email);
    return this.paymentMailer.sendPaymentConfirmation(emails, context);
  }
}
