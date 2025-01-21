import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async order(params: {
    where: any;
    skip?: number;
    take?: number;
    cursor?: any;
    include?: any;
    orderBy?: any;
  }): Promise<any> {
    const { skip, where, take, cursor, orderBy, include } = params;
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

  async ordersByAuthorizedUserToken(token) {
    return this.prisma.orders.findMany({
      include: {
        payments: true,
        cart: {
          include: {
            property: {
              include: {
                properties_managers: {
                  include: {
                    user: {
                      include: {
                        sessions: true,
                      },
                    },
                  },
                },
              },
            },
            cart_products: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        cart: {
          property: {
            properties_managers: {
              some: {
                user: {
                  sessions: {
                    some: {
                      token: token,
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [{ created_at: 'desc' }],
    });
  }

  async createOrder(data: any): Promise<any> {
    return this.prisma.orders.create({ data });
  }

  async updateOrder(where: any, data: any): Promise<any> {
    return this.prisma.orders.update({ where, data });
  }
}
