import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaService } from '../../database/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { PaymentMailer } from '../payments/payment.mailer';
import { PropertiesService } from '../properties/properties.service';
import { ProductsService } from '../products/products.service';
import { WalletsService } from '../wallets/wallets.service';
import { PaymentsService } from '../payments/payments.service';

@Module({
  controllers: [CartsController],
  providers: [
    CartsService,
    OrdersService,
    ProductsService,
    PaymentMailer,
    PropertiesService,
    PrismaService,
    WalletsService,
    PaymentsService,
  ],
})
export class CartsModule {}
