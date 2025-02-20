import { Controller, Get } from '@nestjs/common';
import { ReceivablesService } from './receivables.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationToken } from '../../utils/AuthorizationToken';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Receivables')
@Controller({
  path: 'receivables',
  version: '1',
})
export class ReceivablesController {
  constructor(private readonly receivablesService: ReceivablesService) {}

  @Get()
  async index(@AuthorizationToken() token: string) {
    const receivables =
      await this.receivablesService.listReceivablesByAuthorizationToken(token);
    return { receivables };
  }
}
