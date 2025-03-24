import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { PrismaService } from '../../database/prisma.service';
import { PaymentMailer } from '../payments/payment.mailer';

@Module({
  controllers: [EmailsController],
  providers: [PaymentMailer, PrismaService],
})
export class EmailsModule {}
