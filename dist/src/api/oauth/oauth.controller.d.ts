/// <reference types="passport" />
import { Request } from "express";
export declare class OAuthController {
    onSignInGoogle(): {
        data: {};
    };
    onRedirect(req: Request): Express.User;
    onSignFacebook(): {
        data: {};
    };
    onFaceRedirect(req: Request): Express.User;
}
