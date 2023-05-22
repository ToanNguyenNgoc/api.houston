import { AuthService } from './auth.service';
import { SysForgot, SysLoginGTO, SysUpdateProfileDTO } from './dto';
import { RequestHeader } from '../../interface';
import { Account } from '../account/entities';
import { Request } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    onLogin(body: SysLoginGTO): Promise<import("../../interface").TransformData<any>>;
    onProfile(req: RequestHeader<Account>): Promise<import("../../interface").TransformData<Account>>;
    onUpdateProfile(req: RequestHeader<Account>, updateProfileDTO: SysUpdateProfileDTO): Promise<import("../../interface").TransformData<Account>>;
    findAllRoleByUser(req: RequestHeader<Account>): Promise<{
        data: import("../role/entities").Role[];
    }>;
    findBranchByUser(req: RequestHeader<Account>): Promise<import("../../interface").TransformData<import("../branches/entities").Branch[]>>;
    forgot(req: Request, body: SysForgot): Promise<{
        message: string;
    }>;
}
