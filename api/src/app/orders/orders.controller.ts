import {
  Controller,
  Get,
  Post,
  // Body,
  // Put,
  // Param,
  // Delete,
  // UseGuards,
  // SerializeOptions,
  HttpCode,
  HttpStatus,
  // Logger,
  Req,
  Res,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
// import { CreatePageDto } from './dto/create-page.dto';
// import { UpdatePageDto } from './dto/update-page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Roles } from '../roles/roles.decorator';
// import { RoleEnum } from '../roles/roles.enum';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from '../roles/roles.guard';
import PagarmeTransaction from '../../utils/pagarme';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Orders')
@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @Post()
  // async create(@Req() request: any, @Res() response) {
  //   const { payment_method, hash, ...createPageDto }: any = request.body;
  //   const cart = await this.cartsService.cartWithProducts({
  //     where: { hash: hash },
  //   });
  //   console.log('h0');
  //   const transaction = new PagarmeTransaction();
  //   transaction.setCode(hash);
  //   transaction.setCustomer(this.customer(createPageDto.customer));
  //   transaction.setItemsFromCartProducts(cart.products);
  //
  //   if (payment_method === 'credit_card') {
  //     transaction.setCreditCardPayment({
  //       number: createPageDto.card_number,
  //       holder_name: createPageDto.card_holder,
  //       expire_date: createPageDto.expire_date,
  //       cvv: createPageDto.cvv,
  //       billing_address: this.billingAddress(createPageDto.billing_address),
  //     });
  //   }
  //   if (payment_method === 'pix') {
  //     transaction.setPixPayment();
  //     if (this.isTest()) return response.json(this.mockPixResponse());
  //     return response.json();
  //   }
  //   const acquiredResponse = await transaction
  //     .executeTransaction()
  //     .then((acquiredResponse: any) => {
  //       if (acquiredResponse.status === 'failed') {
  //         return Promise.reject(acquiredResponse);
  //       }
  //       return acquiredResponse;
  //     })
  //     .catch((acquiredResponse) => {
  //       response.status(403);
  //       return acquiredResponse;
  //     });
  //   const order = await this.ordersService.createOrder({
  //     acquirer: 'pagarme',
  //     acquirer_id: acquiredResponse.id,
  //     acquirer_metadata: { customer: acquiredResponse.customer },
  //     cart_id: cart.id,
  //     amount: cart.total_price,
  //     currency: acquiredResponse.currency,
  //     name: acquiredResponse.customer?.name,
  //     document_number: acquiredResponse.customer?.document,
  //     status: acquiredResponse.status,
  //   });
  //   const acquirerPayment = acquiredResponse.charges[0];
  //   const payment = await this.paymentsService.createPayment({
  //     acquirer: 'pagarme',
  //     acquirer_id: acquirerPayment.id,
  //     acquirer_metadata: { last_transaction: acquirerPayment.last_transaction },
  //     order_id: order.id,
  //     amount: acquirerPayment.amount,
  //     currency: acquirerPayment.currency,
  //     status:
  //       acquirerPayment.last_transaction?.status || acquirerPayment.status,
  //     method: acquirerPayment.payment_method,
  //   });
  //   return response.json(acquiredResponse);
  // }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const resOrders = await this.ordersService.orders({
      include: {
        payments: true,
        cart: {
          include: {property: true}
        }
      },
      orderBy: {created_at: 'DESC'}
    });

    const orders = resOrders.map((order: any) => ({
      name: order.name,
        amount: order.amount,
        status: order.status,
        created_at: order.created_at,
        property_name: order.cart?.property?.name,
        payment_method: order.payments?.[0]?.method
    }))
    return { orders };
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
  //   console.log('update', updatePageDto);
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
}
