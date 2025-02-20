import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class WithdrawsService {
  constructor(private prisma: PrismaService) {}

  async withdraw(
    where: any,
    params: {
      skip?: number;
      take?: number;
      cursor?: any;
      where?: any;
      include?: any;
      orderBy?: any;
    },
  ): Promise<any> {
    const { skip, take, cursor, orderBy, include } = params;
    return this.prisma.withdraws.findFirst({
      where,
      skip,
      take,
      cursor,
      orderBy,
      include,
    });
  }

  async withdraws(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    include?: any;
    orderBy?: any;
  }): Promise<any[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.withdraws.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy,
    });
  }

  async createWithdraw(data: any): Promise<any> {
    return this.prisma.withdraws.create({
      data,
    });
  }

  async updateWithdraw(params: { where: any; data: any }): Promise<any> {
    const { data, where } = params;
    return await this.prisma.withdraws.update({
      data,
      where,
    });
  }

  async deleteWithdraw(where: any): Promise<any> {
    return this.prisma.withdraws.delete({
      where,
    });
  }

  async pendingWithdrawsFromWallet(wallet) {
    return this.prisma.withdraws.findMany({
      where: {
        wallet: {
          id: wallet.id,
        },
      },
    });
  }
}
