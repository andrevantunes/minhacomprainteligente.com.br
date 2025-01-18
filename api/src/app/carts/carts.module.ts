import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaService } from '../../database/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { PaymentMailer } from '../payments/payment.mailer';
import { PropertiesService } from '../properties/properties.service';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [CartsController],
  providers: [
    CartsService,
    OrdersService,
    ProductsService,
    PaymentMailer,
    PropertiesService,
    PrismaService,
  ],
})
export class CartsModule {}
