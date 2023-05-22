import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface"
import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { GoogleRecaptchaModuleAsyncOptions } from "@nestlab/google-recaptcha/interfaces/google-recaptcha-module-options"

export const cloudinaryConfig = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    cloud_name: configService.get('CLOUDINARY_NAME'),
    api_key: configService.get('CLOUDINARY_API_KEY'),
    api_secret: configService.get('CLOUDINARY_CL_API_SECRET_KET'),
  }),
  inject: [ConfigService],
}
export const mailerConfig: MailerAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    transport: {
      host: 'smtp.sendgrid.net',
      auth: {
        user: configService.get('MAILER_USER'),
        pass: configService.get('MAILER_PASSWORD'),
      },
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  inject: [ConfigService]
}

export const validatorsFile = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 30000000 }),
    new FileTypeValidator({ fileType: /^(image|video)\// }),
  ],
})
export const recaptchaConfig: GoogleRecaptchaModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secretKey: configService.get('RECAPTCHA_SECRET_KEY'),
    response: req => req.headers.recaptcha,
    actions: ['FORGOT_CUSTOMER', 'BOOKING_CUSTOMER'],
    score: 0.8,
  }),
  inject: [ConfigService]
}