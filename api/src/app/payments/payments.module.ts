import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaService } from '../../database/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import { PaymentTransactionAsaasService } from './paymentTransactionAsaas.service';
import { PaymentMailer } from './payment.mailer';
import { PropertiesService } from '../properties/properties.service';
import { ReceivablesService } from '../receivables/receivables.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    OrdersService,
    CartsService,
    ProductsService,
    PrismaService,
    PaymentTransactionAsaasService,
    PaymentMailer,
    PropertiesService,
    ReceivablesService,
  ],
})
export class PaymentsModule {}
