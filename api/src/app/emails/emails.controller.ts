import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentMailer } from '../payments/payment.mailer';

@ApiBearerAuth()
@ApiTags('Emails')
@Controller({ path: 'emails', version: '1' })
export class EmailsController {
  constructor(private readonly paymentMailer: PaymentMailer) {}

  @Get('/:type/:destiny(*)')
  async sendEmail(
    @Param('type') type: string,
    @Param('destiny') destiny: string,
  ) {
    await this.paymentMailer.sendStaticEmail(
      [destiny],
      type,
      'Seja bem-vindo à sua nova fase!',
    );
    return { type, destiny };
  }
}
