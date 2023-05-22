import { AuthGuard } from "@nestjs/passport";
import { name } from '../../common'

export class JwtSysGuard extends AuthGuard(name.JWT) { } 