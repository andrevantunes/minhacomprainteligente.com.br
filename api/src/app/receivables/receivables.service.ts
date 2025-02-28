import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ReceivablesService {
  constructor(private prisma: PrismaService) {}

  async createReceivable(
    wallet_id,
    amount,
    currency,
    settlement_forecast_at,
    payment_id,
  ) {
    return this.prisma.receivables.create({
      data: {
        wallet_id,
        amount,
        currency,
        settlement_forecast_at,
        payment_id,
      },
    });
  }

  async listReceivablesByAuthorizationToken(token) {
    return this.prisma.receivables.findMany({
      where: {
        settlement_forecast_at: {
          gt: new Date(),
        },
        settled_at: {
          equals: null,
        },
        wallet: {
          user: {
            sessions: {
              some: {
                token,
              },
            },
          },
        },
      },
      include: {
        payment: {
          include: {
            order: true,
          },
        },
      },
    });
  }
}
