import {Controller, Get, Param, Post, Put, Req} from '@nestjs/common';
import { ReplacementsService } from './replacements.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReplacementDto } from './dto/create-replacement.dto';

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
  async show(@Param('id') id: number) {
    const replacement = await this.replacementsService.findReplacementById(id);
    return { replacement };
  }

  @Get()
  async index() {
    const replacements = await this.replacementsService.all();
    console.log(replacements)
    return { replacements };
  }

  @Put('/:id(*)')
  update(@Param('id') id: number, @Req() request: any) {
    const createReplacementDto: CreateReplacementDto = request.body;
    return this.replacementsService.update({
      where: { id },
      data: { status: createReplacementDto.status},
    });
  }
}
