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

  async removeProductsFromProperty(products, propertyId) {
    console.log('Remover', { products, propertyId });
    return { products, propertyId };
  }

  async validateProductsFromProperty(products, propertyId) {
    console.log('Validate', { products, propertyId });
    return { products, propertyId };
  }
}
