/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { OAuthGuard, FacebookAuthGuard } from 'src/middlewares/guards';
import { Request } from "express"

@ApiSecurity('x-api-key')
@ApiTags('customers')
@Controller('customers/auth')
export class OAuthController {

  //[google]
  @UseGuards(OAuthGuard)
  @Get('google/login')
  onSignInGoogle() {
    return { data: {} }
  }
  @ApiExcludeEndpoint()
  @UseGuards(OAuthGuard)
  @Get('google/redirect')
  onRedirect(@Req() req: Request) {
    return req.user
  }

  //[facebook]
  @Get('facebook/login')
  @UseGuards(FacebookAuthGuard)
  onSignFacebook() {
    return { data: {} }
  }

  @ApiExcludeEndpoint()
  @UseGuards(FacebookAuthGuard)
  @Get('facebook/redirect')
  onFaceRedirect(@Req() req: Request) {
    return req.user
  }
}
