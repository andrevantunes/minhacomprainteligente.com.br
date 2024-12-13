import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class BalancesService {
  constructor(private prisma: PrismaService) {}

  async balance(
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
    return this.prisma.balances.findFirst({
      where,
      skip,
      take,
      cursor,
      orderBy,
      include,
    });
  }

  async balances(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    include?: any;
    orderBy?: any;
  }): Promise<any[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.balances.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy,
    });
  }

  async createBalance(data: any): Promise<any> {
    return this.prisma.balances.create({
      data,
    });
  }

  async updateBalance(params: { where: any; data: any }): Promise<any> {
    const { data, where } = params;
    return await this.prisma.balances.update({
      data,
      where,
    });
  }

  async deleteBalance(where: any): Promise<any> {
    return this.prisma.balances.delete({
      where,
    });
  }
}
