import { Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ReplacementsService } from './replacements.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReplacementDto } from './dto/create-replacement.dto';
import { AuthorizationToken } from '../../utils/AuthorizationToken';
import { PropertiesService } from '../properties/properties.service';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Replacements')
@Controller({
  path: 'replacements',
  version: '1',
})
export class ReplacementsController {
  constructor(
    private readonly replacementsService: ReplacementsService,
    private readonly propertiessService: PropertiesService,
  ) {}

  @Post()
  create(@Req() request: any) {
    const createReplacementDto: CreateReplacementDto = request.body;
    return this.replacementsService.createReplacement(
      createReplacementDto.property_products,
    );
  }

  @Get('/:id(*)')
  async show(@Param('id') id: number, @AuthorizationToken() token: string) {
    const replacement: any = await this.replacementsService.findReplacementById(
      id,
      token,
    );
    await Promise.all(
      replacement.replacement_property_products.map(
        async (replacement_property_product: any) => {
          const property_product: any =
            await this.propertiessService.findPropertyProduct(
              replacement_property_product.property_id,
              replacement_property_product.product_id,
            );
          replacement_property_product.expected_quantity =
            property_product.expected_quantity;
          replacement_property_product.current_quantity =
            property_product.current_quantity;
          return property_product;
        },
      ),
    );
    return { replacement };
  }

  @Get()
  async index(@AuthorizationToken() token: string) {
    const replacements =
      await this.replacementsService.replacementsFromAuthenticatedUserToken(
        token,
      );
    return { replacements };
  }

  @Put('/:id(*)')
  async update(
    @Param('id') id: number,
    @Req() request: any,
    @AuthorizationToken() token: string,
  ) {
    const createReplacementDto: CreateReplacementDto = request.body;
    const replacement = await this.replacementsService.findReplacementById(
      id,
      token,
    );
    if (!replacement) return new Error('not found/not access');
    return this.replacementsService.update(replacement, {
      where: { id },
      data: { status: createReplacementDto.status },
    });
  }
}
