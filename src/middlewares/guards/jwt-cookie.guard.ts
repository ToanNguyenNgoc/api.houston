import { AuthGuard } from "@nestjs/passport";
import { name } from '../../common'

export class JwtCookieGuard extends AuthGuard(name.JWT_COOKIE) { } 