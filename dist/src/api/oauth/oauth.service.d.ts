import { Request, Response } from "express";
import { GenerateToken } from 'src/services';
export declare class OauthService {
    private readonly gTokenService;
    constructor(gTokenService: GenerateToken);
    onGoogleRedirect(req: Request, res: Response): Promise<void>;
}
