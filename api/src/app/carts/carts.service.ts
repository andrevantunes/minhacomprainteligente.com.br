import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async cart(
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
    return this.prisma.properties.findFirst({
      where,
      skip,
      take,
      cursor,
      orderBy,
      include,
    });
  }

  async cartWithProducts(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }): Promise<any> {
    const { skip, take, cursor, where, orderBy } = params;
    const cart = await this.prisma.carts.findFirst({
      skip,
      take,
      cursor,
      where,
      include: {
        cart_products: {
          include: {
            product: true,
          },
        },
      },
      orderBy,
    });
    // @ts-ignore
    const products = cart.cart_products.map(({ product, ...cart_product }) => ({
      ...product,
      ...cart_product,
    }));
    // @ts-ignore
    delete cart.cart_products;
    return { products, ...cart };
  }

  async carts(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    include?: any;
    orderBy?: any;
  }): Promise<any[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    const properties = await this.prisma.properties.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy,
    });

    properties.forEach((property) => {
      if (!property.name) {
        // @ts-ignore
        property.name = `${property.address.country}, ${property.address.state}, ${property.address.city}, ${property.address.neighbourhood}, ${property.address.street_number}, ${property.address.complement} (${property.address.refference})`;
      }
    });
    return properties;
  }

  async createCart(data: any): Promise<any> {
    if (data.products) {
      data.total_price = 0;
      data.cart_products = {
        create: data.products.map((product) => {
          const unity_price = product.price; //TODO buscar e não receber do front
          const subtotal_price = product.price * product.quantity;
          data.total_price += subtotal_price;
          return {
            product_id: product.product_id,
            quantity: product.quantity,
            unity_price,
            subtotal_price,
          };
        }),
      };
      delete data.products;
    }

    return this.prisma.carts.create({ data, include: { cart_products: true } });
  }

  async updateCart(params: { where: any; data: any }): Promise<any> {
    const { data, where } = params;
    return await this.prisma.properties.update({
      data,
      where,
    });
  }

  async deleteCart(where: any): Promise<any> {
    return this.prisma.properties.delete({
      where,
    });
  }
}
