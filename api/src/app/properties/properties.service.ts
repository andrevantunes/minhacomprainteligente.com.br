import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async property(
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

  async propertyWithProducts(where) {
    const property = await this.prisma.properties.findFirst({
      where,
      include: {
        address: true,
        properties_products: {
          include: {
            product: true,
          },
        },
      },
    });
    // @ts-ignore
    if (!property.name) {
      // @ts-ignore
      property.name = `${property.address.country}, ${property.address.state}, ${property.address.city}, ${property.address.neighbourhood}, ${property.address.street_number}, ${property.address.complement} (${property.address.refference})`;
    }
    return property;
  }

  async properties(params: {
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

  async createProperty(data: any): Promise<any> {
    return this.prisma.properties.create({
      data,
    });
  }

  async updateProperty(params: { where: any; data: any }): Promise<any> {
    const { data, where } = params;
    return await this.prisma.properties.update({
      data,
      where,
    });
  }

  async deleteProperty(where: any): Promise<any> {
    return this.prisma.properties.delete({
      where,
    });
  }
}
