import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PaymentsService {
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
    } = {},
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
    // @ts-expect-error error
    const products = cart.cart_products.map(({ product, ...cart_product }) => ({
      ...product,
      ...cart_product,
    }));
    // @ts-expect-error error
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
        // @ts-expect-error error
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
    if (data.products) {
      let total_price = 0;
      const cart = await this.prisma.carts.findFirst({ where });
      if (cart) {
        const promises = data.products.map(
          (product: { id: number; quantity: number; unity_price: number }) => {
            // todo atualizar unity_price pelo product
            const subtotal_price = product.quantity * product.unity_price;
            total_price += subtotal_price;
            return this.prisma.cart_products.update({
              data: { subtotal_price, quantity: product.quantity },
              where: {
                product_id_cart_id: {
                  product_id: product.id,
                  cart_id: cart.id,
                },
              },
            });
          },
        );
        await Promise.all(promises);

        return this.prisma.carts.update({ data: { total_price }, where });
      }
    }
    return await true;
  }

  // async deleteCart(where: any): Promise<any> {
  //   return this.prisma.carts.delete({
  //     where,
  //   });
  // }
}
