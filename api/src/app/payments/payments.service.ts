import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async payment(
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
    return this.prisma.payments.findFirst({
      where,
      skip,
      take,
      cursor,
      orderBy,
      include,
    });
  }

  async payments(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    include?: any;
    orderBy?: any;
  }): Promise<any[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    const properties = await this.prisma.payments.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy,
    });
    return properties;
  }

  async findByOrderId(order_id): Promise<any> {
    return this.prisma.payments.findFirst({ where: { order_id } });
  }

  async createPayment(data: any): Promise<any> {
    return this.prisma.payments.create({ data });
  }
}
