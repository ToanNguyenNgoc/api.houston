import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { customOptions, options } from './swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport'
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOrigin = process.env.CORS_ORIGIN?.split(',')
  app.enableCors({
    "origin": corsOrigin,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "credentials": true
  })
  app.setViewEngine('hbs')
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(__dirname + 'public');
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.use(cookieParser())
  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 600000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, customOptions);
  await app.listen(process.env.TYPEORM_LOCAL_PORT || 3000);
  console.log(`run PORT : ${process.env.TYPEORM_LOCAL_PORT || 3000}`)
}
bootstrap();
//
