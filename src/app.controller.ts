import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiExcludeEndpoint()
  @Get()
  @Render('index')
  initial() {
    return this.appService.getHello()
  }
}
