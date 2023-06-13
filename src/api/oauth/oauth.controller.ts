/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { OAuthGuard, FacebookAuthGuard } from 'src/middlewares/guards';
import { Request, Response } from "express";
import { OauthService } from "./oauth.service"
import { name } from 'src/common';
import { GenerateToken } from 'src/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/api/customer/entities';
import { Repository } from 'typeorm';

@ApiSecurity('x-api-key')
@ApiTags('customers')
@Controller('customers/auth')
export class OAuthController {
  constructor(
    private readonly oauthService: OauthService
  ) { }

  //[google]
  @UseGuards(OAuthGuard)
  @Get('google/login')
  onSignInGoogle() {
    return { data: {} }
  }
  @ApiExcludeEndpoint()
  @UseGuards(OAuthGuard)
  @Get('google/redirect')
  async onRedirect(@Req() req: Request, @Res() res: Response) {
    return this.oauthService.onGoogleRedirect(req, res)
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
