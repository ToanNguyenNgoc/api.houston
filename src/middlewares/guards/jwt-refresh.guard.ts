import { AuthGuard } from "@nestjs/passport";
import { name } from "../../common";

export class JwtRefreshGuard extends AuthGuard(name.JWT_REFRESH) { } 