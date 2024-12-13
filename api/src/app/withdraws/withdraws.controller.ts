import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {BalancesService} from "../balances/balances.service";

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
    private readonly balancesService: BalancesService,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const balances = await this.balancesService.balances({});
    const withdraws = await this.withdrawsService.withdraws({});
    return { balances, withdraws };
  }
}
