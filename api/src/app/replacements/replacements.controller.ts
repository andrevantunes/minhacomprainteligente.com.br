import { Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ReplacementsService } from './replacements.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReplacementDto } from './dto/create-replacement.dto';
import { AuthorizationToken } from '../../utils/AuthorizationToken';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Replacements')
@Controller({
  path: 'replacements',
  version: '1',
})
export class ReplacementsController {
  constructor(private readonly replacementsService: ReplacementsService) {}

  @Post()
  create(@Req() request: any) {
    const createReplacementDto: CreateReplacementDto = request.body;
    return this.replacementsService.createReplacement(
      createReplacementDto.property_products,
    );
  }

  @Get('/:id(*)')
  async show(@Param('id') id: number, @AuthorizationToken() token: string) {
    const replacement = await this.replacementsService.findReplacementById(
      id,
      token,
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
    return this.replacementsService.update({
      where: { id },
      data: { status: createReplacementDto.status },
    });
  }
}
