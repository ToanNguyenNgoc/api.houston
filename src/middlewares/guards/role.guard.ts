/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { key } from '../../common';
import { encode } from '../../utils'

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { route, method, user } = context.switchToHttp().getRequest()
    if (user.type !== 'AUTHENTICATE') {
      throw new ForbiddenException('User does not have the right roles.')
    }
    const codes = user.roles?.map(role => role.code)
    if (codes?.includes(encode(key.SUPER_ADMIN))) {
      return true
    }
    const rules = user.roles
      ?.map(rule => rule.permissions)
      ?.flat()
      ?.map(per => per.permission_path) ?? []
    const path = route.path.split('/').filter(Boolean).join('.')
    const currentPath = `api.${path}.${method}`
    if (rules.includes(currentPath)) {
      return true
    } else {
      throw new ForbiddenException(`You cannot use method: ${method} with ${route.path}`)
    }
  }
}
