import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Withdraws')
@Controller({
  path: 'withdraws',
  version: '1',
})
export class BalancesController {
  constructor(private readonly withdrawsService: BalancesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const withdraws = await this.withdrawsService.balances({});
    return { withdraws };
  }
}
