/*
https://docs.nestjs.com/controllers#controllers
*/

import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';

// @ApiTags('send-mail')
// @ApiSecurity('x-api-key')
@Controller('send-mail')
export class SendMailController {
  constructor(
    private readonly mailerService: MailerService
  ) { }
  // @Get()
  // async get() {
  //   const response = await this.mailerService.sendMail({
  //     to: '5751071044@st.utc2.edu.vn',
  //     from: 'ngoctoan06011998@gmail.com',
  //     subject: 'Plain Text Email ✔',
  //     template: 'otp',
  //     context: { data: 1 }
  //   })
  //   return response
  //   const code = randomCode(6)
  //   return { message: code }
  // }
}
