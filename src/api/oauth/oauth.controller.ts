/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { OAuthGuard } from 'src/middlewares/guards';
import {Request} from "express"

@ApiSecurity('x-api-key')
@ApiTags('customers')
@Controller('customers/auth')
export class OAuthController {

  @UseGuards(OAuthGuard)
  @Get('google/login')
  onSignInGoogle() {
    return
  }
  @UseGuards(OAuthGuard)
  @Get('google/redirect')
  onRedirect(@Req() req:Request){
    console.log(req.user)
    return req.user
  }
}
