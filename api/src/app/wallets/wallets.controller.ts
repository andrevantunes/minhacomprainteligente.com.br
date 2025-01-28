import { Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReplacementDto } from './dto/create-wallets.dto';
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
    console.log('wallets 1')
    const wallets =
      await this.walletsService.allFromAuthenticatedUserToken(
        token,
      );
    console.log('wallets 2', wallets)
    return { wallets };
  }
}
