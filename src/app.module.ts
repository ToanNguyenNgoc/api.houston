import { AuthHeaderModule } from './auth-header/auth-header.module';
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
// import { ApiHeaderGuard } from './middlewares/guards';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { Role } from 'src/api/role/entities';
import { ApiModule } from 'src/api/api.module';

const mailerConfig: MailerAsyncOptions = {
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

@Module({
  imports: [
    // AuthHeaderModule,
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([Role]),
    CloudinaryModule.forRootAsync(cloudinaryConfig),
    MailerModule.forRootAsync(mailerConfig),
    GoogleRecaptchaModule.forRootAsync(recaptchaConfig),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ApiHeaderGuard,
    // },
  ],
})
export class AppModule { }
