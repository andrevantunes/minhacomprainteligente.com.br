import { Controller } from '@nestjs/common';
import { ReceivablesService } from './receivables.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
}
