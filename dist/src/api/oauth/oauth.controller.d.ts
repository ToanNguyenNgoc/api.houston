/// <reference types="passport" />
import { Request, Response } from "express";
import { OauthService } from "./oauth.service";
export declare class OAuthController {
    private readonly oauthService;
    constructor(oauthService: OauthService);
    onSignInGoogle(): {
        data: {};
    };
    onRedirect(req: Request, res: Response): Promise<void>;
    onSignFacebook(): {
        data: {};
    };
    onFaceRedirect(req: Request): Express.User;
}
