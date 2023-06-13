/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Request, Response } from "express";
import { Customer } from 'src/api/customer/entities';
import { name } from 'src/common';
import { GenerateToken } from 'src/services';

@Injectable()
export class OauthService {
  constructor(
    private readonly gTokenService: GenerateToken
  ) { }
  async onGoogleRedirect(req: Request, res: Response) {
    const cbHomeUrl = process.env.OAUTH_CALLBACK_HOME
    const clientDomain = process.env.CLIENT_DOMAIN
    try {
      const user = req.user as Customer
      const { token, token_expired_at } = await this.gTokenService.generateToken(user.id, user.email)
      const refresh_token = await this.gTokenService.generateRefreshToken(req, user.id, user.email)
      return res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        domain: clientDomain,
        maxAge: name.AGE_RE_TOKEN
      })
        .cookie('token_expired_at', token_expired_at, {
          secure: true,
          domain: clientDomain,
          sameSite: 'lax',
          maxAge: name.AGE_RE_TOKEN
        })
        .cookie('access_token', token, {
          secure: true,
          domain: clientDomain,
          sameSite: 'lax',
          maxAge: name.AGE_RE_TOKEN
        }).redirect(cbHomeUrl)
    } catch (error) {
      return res.redirect(`${cbHomeUrl}/404`)
    }
  }
}
