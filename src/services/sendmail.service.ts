import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface SendMailType {
  to?: string,
  subject?: string,
  template?: 'otp' | 'welcome' | 'booking_confirm',
  context?: any
}

@Injectable()
export class SendMailService {
  constructor(
    private readonly mailerService: MailerService
  ) { }
  async onSendMail({ to, subject, template, context }: SendMailType) {
    await this.mailerService.sendMail({
      to: to,
      from: process.env.MAILER_ORIGINAL,
      subject: subject,
      template: template,
      context: context
    })
    return
  }
}
