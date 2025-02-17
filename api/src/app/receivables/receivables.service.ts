import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ReceivablesService {
  constructor(private prisma: PrismaService) {}

  async createReceivable(wallet_id, amount, currency, settlement_forecast_at) {
    return this.prisma.receivables.create({
      data: {
        wallet_id,
        amount,
        currency,
        settlement_forecast_at,
      },
    });
  }
}
