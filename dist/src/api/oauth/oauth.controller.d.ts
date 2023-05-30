/// <reference types="passport" />
import { Request } from "express";
export declare class OAuthController {
    onSignInGoogle(): void;
    onRedirect(req: Request): Express.User;
}
