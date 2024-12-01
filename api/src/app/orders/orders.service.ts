import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async order(
    where: any,
    params: {
      skip?: number;
      take?: number;
      cursor?: any;
      where?: any;
      include?: any;
      orderBy?: any;
    } = {},
  ): Promise<any> {
    const { skip, take, cursor, orderBy, include } = params;
    return this.prisma.orders.findFirst({
      where,
      skip,
      take,
      cursor,
      orderBy,
      include,
    });
  }

  async orders(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    include?: any;
    orderBy?: any;
  }): Promise<any[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    const orders = await this.prisma.orders.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy,
    });
    return orders;
  }

  async createOrder(data: any): Promise<any> {
    return this.prisma.orders.create({ data });
  }
}
