import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { customOptions, options } from './swagger';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOrigin = process.env.CORS_ORIGIN?.split(',')
  app.enableCors({
    "origin": corsOrigin,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "credentials": true
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(__dirname + 'public');
  app.use(cookieParser())
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, customOptions);
  await app.listen(process.env.TYPEORM_LOCAL_PORT || 3000);
  console.log(`run PORT : ${process.env.TYPEORM_LOCAL_PORT || 3000}`)
}
bootstrap();
