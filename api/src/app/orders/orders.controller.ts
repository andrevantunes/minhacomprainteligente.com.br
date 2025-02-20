import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationToken } from '../../utils/AuthorizationToken';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@AuthorizationToken() token: string) {
    const dbOrders =
      await this.ordersService.ordersByAuthorizedUserToken(token);

    const orders = this.serializeOrders(dbOrders);
    return { orders };
  }

  private serializeOrders(orders) {
    return orders.map((order: any) => {
      const products = order.cart.cart_products.map((cart_product) => {
        return {
          quantity: cart_product.quantity,
          name: cart_product.product.name,
        };
      });
      return {
        hash: order.hash,
        name: order.name,
        amount: order.amount,
        status: order.status,
        products,
        created_at: order.created_at,
        property_name: order.cart?.property?.name,
        payment_method: order.payments?.[0]?.method,
      };
    });
  }
}
