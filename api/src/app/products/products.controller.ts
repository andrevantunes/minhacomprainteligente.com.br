import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiBearerAuth()
@ApiTags('Products')
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async index() {
    const products = await this.productsService.products({
      // TODO apenas produtos da propriedade da pessoa ou que a pessoa tenha criado
    });
    return { products };
  }
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findOne(@Param('id') id: number) {
    const product = await this.productsService.product({ id }, {});
    return { product };
  }
  @HttpCode(HttpStatus.OK)
  @Get('/:id/properties')
  async indexProperties(@Param('id') id: number) {
    const product = await this.productsService.productWithProperties({ id });
    return { product };
  }
}
