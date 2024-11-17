import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async page(pageWhereUniqueInput: any): Promise<any> {
    return this.prisma.pages.findUnique({
      where: pageWhereUniqueInput,
    });
  }

  async pages(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }): Promise<any[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pages.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPage(data: any): Promise<any> {
    return this.prisma.pages.create({
      data,
    });
  }

  async updatePage(params: { where: any; data: any }): Promise<any> {
    const { data, where } = params;
    return await this.prisma.pages.update({
      data,
      where,
    });
  }

  async deletePage(where: any): Promise<any> {
    return this.prisma.pages.delete({
      where,
    });
  }
}
