import { sendEmail } from '../../utils/mailer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

export class PaymentMailer {
  constructor() {}

  async sendPaymentConfirmation(to: string[], context: any) {
    const templatePath = path.resolve(
      process.env.PWD || process.cwd(),
      'public',
      'mail',
      'payment.sendPaymentConfirmation.hbs',
    );
    const template = fs.readFileSync(templatePath, 'utf-8');
    const subject = 'Pagamento recebido';
    const body = Handlebars.compile(template, {
      strict: true,
    })({ ...context, subject });
    return sendEmail({
      to,
      body,
      subject,
      from: 'Digital Flux Store<notificacoes@digitalflux.store>',
    });
  }
}
