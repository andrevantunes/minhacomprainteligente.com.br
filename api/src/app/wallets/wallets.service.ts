import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  async allFromAuthenticatedUserToken(authenticatedUserToken: string) {
    return await this.prisma.wallets.findMany({
      where: {
        user: {
          sessions: {
            some: {
              token: authenticatedUserToken,
            },
          },
        },
      },
      include: {
        receivables: true,
      },
    });
  }

  async findByPropertyId(property_id, currency) {
    return this.prisma.wallets.findFirst({
      include: {
        properties_wallets: {
          include: {
            wallet: true,
          },
        },
      },
      where: {
        currency,
        properties_wallets: {
          some: {
            property_id,
          },
        },
      },
    });
  }

  async addAmount(id, amount) {
    const wallet = await this.prisma.wallets.findFirst({
      where: { id },
    });
    if (!wallet) return null;

    return this.prisma.wallets.update({
      where: { id },
      data: { amount: wallet.amount + amount },
    });
  }
}
