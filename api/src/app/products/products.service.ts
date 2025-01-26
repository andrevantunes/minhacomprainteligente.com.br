import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async product(
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
    return this.prisma.products.findFirst({
      where,
      skip,
      take,
      cursor,
      orderBy,
      include,
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    include?: any;
    orderBy?: any;
  }): Promise<any[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    const properties = await this.prisma.products.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy,
    });
    return properties;
  }

  async createProduct(data: any): Promise<any> {
    return this.prisma.products.create({
      data,
    });
  }

  async updateProduct(params: { where: any; data: any }): Promise<any> {
    const { data, where } = params;
    return await this.prisma.products.update({
      data,
      where,
    });
  }

  async deleteProduct(where: any): Promise<any> {
    return this.prisma.products.delete({
      where,
    });
  }

  async removeProductsFromProperty(products = [], propertyId) {
    return await Promise.all(
      products?.map(async (product: any) => {
        const dbPropertyProduct =
          await this.prisma.properties_products.findFirst({
            where: { product_id: product.id, property_id: propertyId },
          });
        console.log({
          current_quantity:
            (dbPropertyProduct?.current_quantity ?? 1) - product.quantity,
        });
        await this.prisma.properties_products.update({
          data: {
            current_quantity:
              (dbPropertyProduct?.current_quantity ?? 1) - product.quantity,
          },
          where: {
            product_id_property_id: {
              product_id: product.id,
              property_id: propertyId,
            },
          },
        });
      })
    );
  }
  async removeProductsFromCart(cart) {
    return await Promise.all(
      cart.cart_products?.map(async (cart_product: any) => {
        const dbPropertyProduct =
          await this.prisma.properties_products.findFirst({
            where: { product_id: cart_product.product_id, property_id: cart.property_id },
          });
        console.log(dbPropertyProduct);
        console.log({
          current_quantity:
            (dbPropertyProduct?.current_quantity ?? 1) - cart_product.quantity,
        });
        await this.prisma.properties_products.update({
          data: {
            current_quantity:
              (dbPropertyProduct?.current_quantity ?? 1) -
              cart_product.quantity,
          },
          where: {
            product_id_property_id: {
              product_id: cart_product.product_id,
              property_id: cart.property_id,
            },
          },
        });
      })
    );
  }

  async validateProductsFromProperty(products, propertyId) {
    return { products, propertyId };
  }
}
