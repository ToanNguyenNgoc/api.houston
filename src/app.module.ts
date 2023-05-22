import { ApiModule } from './api/api.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from '../db/data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { cloudinaryConfig, recaptchaConfig } from './config'
import { CloudinaryModule } from 'nestjs-cloudinary';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
// import { Role } from './system/role/entities';
// import { ApiHeaderGuard } from './middlewares/guards';
// import { AuthHeaderModule } from './auth-header/auth-header.module';

const mailerConfig: MailerAsyncOptions = {
  imports: [
    ApiModule,
    ConfigModule
  ],
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // TypeOrmModule.forFeature([Role]),
    CloudinaryModule.forRootAsync(cloudinaryConfig),
    MailerModule.forRootAsync(mailerConfig),
    GoogleRecaptchaModule.forRootAsync(recaptchaConfig),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
