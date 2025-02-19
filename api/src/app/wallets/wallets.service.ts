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

  async addAmount(id: number, amount: number, payment_id: number) {
    const wallet: any = await this.prisma.wallets.findFirst({
      where: { id },
    }); // TODO resolver tipo
    if (!wallet) return null;

    await this.prisma.wallet_moviments.create({
      data: { amount, payment_id, wallet_id: wallet.id },
    });

    return this.prisma.wallets.update({
      where: { id },
      data: { amount: wallet.amount + amount },
    });
  }
}
