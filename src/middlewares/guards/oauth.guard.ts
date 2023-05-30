/*
https://docs.nestjs.com/guards#guards
*/

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { name } from 'src/common';

@Injectable()
export class OAuthGuard extends AuthGuard(name.GOOGLE_OAUTH_2) {
  async canActivate(context: ExecutionContext) {
    const active = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest()
    await super.logIn(request)
    return active
  }
}
