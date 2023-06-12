/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport"
import { name } from 'src/common';

@Injectable()
export class FacebookAuthGuard extends AuthGuard(name.FACEBOOK_AUTH) {
  async canActivate(context: ExecutionContext) {
    const active = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest()
    await super.logIn(request)
    return active
  }
}
