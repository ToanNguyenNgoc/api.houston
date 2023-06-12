import { ExecutionContext } from '@nestjs/common';
declare const FacebookAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class FacebookAuthGuard extends FacebookAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
