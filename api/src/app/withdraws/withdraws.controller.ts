import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Withdraws')
@Controller({
  path: 'withdraws',
  version: '1',
})
export class WithdrawsController {
  constructor(
    private readonly withdrawsService: WithdrawsService,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const withdraws = await this.withdrawsService.withdraws({});
    return { withdraws };
  }
}
