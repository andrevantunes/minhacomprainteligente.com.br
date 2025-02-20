import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationToken } from '../../utils/AuthorizationToken';
import { WithdrawsService } from '../withdraws/withdraws.service';
import { UserService } from '../../users/user.service';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Wallets')
@Controller({
  path: 'wallets',
  version: '1',
})
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly withdrawsService: WithdrawsService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async index(@AuthorizationToken() token: string) {
    const wallets =
      await this.walletsService.allFromAuthenticatedUserToken(token);
    return { wallets };
  }

  @Post('/:id/withdraw')
  async withdrarRequest(
    @AuthorizationToken() token: string,
    @Param('id') id: number,
    @Req() request: any,
  ) {
    const wallet: any =
      await this.walletsService.findByIdAndAuthenticatedUserToken(id, token); // TODO resolver tipagem
    const user: any = await this.userService.findByAuthenticatedToken(token);
    if (request.body.amount > wallet.amount) {
      return { error: { amount: 'Greater than wallet current value' } };
    }
    await this.walletsService.requestWithdrawAmount(wallet, {
      amount: request.body.amount,
      user_id: user.id,
      fingerprint: request.body.fingerprint,
      ip: request?.ip,
    });
    // TODO enviar email para time interno
    return { success: 'Withdraw successfully requested' };
  }
}
