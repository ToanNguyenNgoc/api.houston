import { ExecutionContext } from '@nestjs/common';
declare const OAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class OAuthGuard extends OAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
