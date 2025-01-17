import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ReplacementsService {
  constructor(private prisma: PrismaService) {}

  async findReplacementById(id: number){
    return await this.prisma.replacements.findFirst({
      where: {
        id
      },
      include: {
        replacement_property_products: true
      }
    })
  }

  async createReplacement(replacement_property_products: any[]): Promise<any> {
    const replacement = await this.prisma.replacements.create({
      data: {
        status: 'processing',
      },
    });
    const result = await Promise.all(
      replacement_property_products.map(
        ({ quantity, property_id, product_id }: any) => {
          return this.prisma.replacement_property_products.create({
            data: {
              replacement: {
                connect: { id: replacement.id },
              },
              property: {
                connect: { id: property_id },
              },
              product: {
                connect: { id: product_id },
              },
              quantity: quantity,
            },
          });
        },
      ),
    );
    return {
      ...replacement,
      replacement_property_products: result,
    };
  }
}
