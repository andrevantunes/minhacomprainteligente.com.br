import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ReplacementsService {
  constructor(private prisma: PrismaService) {}

  async replacementsFromAuthenticatedUserToken(authenticatedUserToken: string) {
    return await this.prisma.replacements.findMany({
      where: {
        replacement_property_products: {
          some: {
            property: {
              properties_managers: {
                some: {
                  user: {
                    sessions: {
                      some: {
                        token: authenticatedUserToken,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      include: {
        replacement_property_products: {
          include: {
            product: true,
            property: true,
          },
        },
      },
    });
  }

  async findReplacementById(id: number, authenticatedUserToken: string) {
    return await this.prisma.replacements.findFirst({
      where: {
        id,
        replacement_property_products: {
          some: {
            property: {
              properties_managers: {
                some: {
                  user: {
                    sessions: {
                      some: {
                        token: authenticatedUserToken,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      include: {
        replacement_property_products: {
          include: {
            product: true,
            property: true,
          },
        },
      },
    });
  }

  async update(replacement, prismaData) {
    console.log('update');
    await Promise.all(
      replacement.replacement_property_products?.map(
        async (replacement_property_product) => {
          const property_products: any =
            await this.prisma.properties_products.findUnique({
              where: {
                product_id_property_id: {
                  product_id: replacement_property_product.product_id,
                  property_id: replacement_property_product.property_id,
                },
              },
            });
          if (property_products.current_quantity < 0) {
            property_products.current_quantity = 0;
          }
          console.log(
            property_products,
            property_products.current_quantity +
              replacement_property_product.quantity,
          );
          return this.prisma.properties_products.update({
            where: {
              product_id_property_id: {
                product_id: replacement_property_product.product_id,
                property_id: replacement_property_product.property_id,
              },
            },
            data: {
              current_quantity:
                property_products.current_quantity +
                replacement_property_product.quantity,
            },
          });
        },
      ),
    );
    return await this.prisma.replacements.update(prismaData);
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
