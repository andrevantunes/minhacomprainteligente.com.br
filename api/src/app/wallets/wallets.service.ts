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
}
