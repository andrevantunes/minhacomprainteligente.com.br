import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaService } from '../../database/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    OrdersService,
    CartsService,
    ProductsService,
    PrismaService,
  ],
})
export class PaymentsModule {}
