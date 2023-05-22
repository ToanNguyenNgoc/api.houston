import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthHeaderService } from '../../auth-header/auth-header.service';
declare const ApiKeyStrategy_base: new (...args: any[]) => HeaderAPIKeyStrategy;
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private readonly authHeaderService;
    constructor(authHeaderService: AuthHeaderService);
}
export {};
