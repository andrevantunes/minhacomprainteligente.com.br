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
import { PaymentsService } from '../payments/payments.service';
import { OrdersService } from '../orders/orders.service';
import { PaymentTransactionAsaasService } from '../payments/paymentTransactionAsaas.service';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Carts')
@Controller({
  path: 'carts',
  version: '1',
})
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly ordersService: OrdersService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post()
  create(@Req() request: any) {
    const createPageDto: any = request.body;
    return this.cartsService.createCart(createPageDto);
  }

  @Get('/payment/:hash(*)')
  async findCartPayment(@Param('hash') hash: string) {
    const cart = await this.cartsService.cart({ where: { hash: hash } });
    const order = await this.ordersService.order({
      where: { cart_id: cart.id },
      orderBy: { id: 'desc' },
    });
    const acquirerOrder: any = {};
    if (order?.acquirer_id && order.status !== 'paid') {
      if (order.acquirer === 'asaas') {
        const acquirer = new PaymentTransactionAsaasService();
        const aquirerOrder = await acquirer.findPayment(order.acquirer_id);
        if (['RECEIVED', 'PAID'].includes(aquirerOrder?.status)) {
          order.status = 'paid';
          await this.ordersService.updateOrder(
            { id: order.id },
            { updated_at: new Date(), status: 'paid' },
          );
        }
      }
      if (order.acquirer === 'pagarme') {
      }
      // const pagarme = new PagarmeTransaction();
      // acquirerOrder = await pagarme.find(order.acquirer_id);
      // if (acquirerOrder.status === 'paid') {
      //   order.status = 'paid';
      //   await this.ordersService.updateOrder(
      //     { id: order.id },
      //     { updated_at: new Date(), status: order.status },
      //   );
      // }
    }
    return { cart, order, acquirerOrder };
  }
  @Get('/:hash(*)')
  async findOne(@Param('hash') hash: string) {
    //TODO deve verificar se a pessoa tem acesso a página antes de devolver
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
    return this.cartsService.updateCart({
      where: { hash },
      data: updatePageDto,
    });
  }
}
