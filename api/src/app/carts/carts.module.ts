import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaService } from '../../database/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { PaymentsService } from '../payments/payments.service';

@Module({
  controllers: [CartsController],
  providers: [CartsService, OrdersService, PaymentsService, PrismaService],
})
export class CartsModule {}
