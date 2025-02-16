import { Controller, Get } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationToken } from '../../utils/AuthorizationToken';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Wallets')
@Controller({
  path: 'wallets',
  version: '1',
})
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  async index(@AuthorizationToken() token: string) {
    const wallets =
      await this.walletsService.allFromAuthenticatedUserToken(token);
    return { wallets };
  }
}
