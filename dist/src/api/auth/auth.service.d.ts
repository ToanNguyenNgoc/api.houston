import { Repository } from 'typeorm';
import { Account } from '../account/entities';
import { SysForgot, SysLoginGTO, SysUpdateProfileDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Branch } from '../branches/entities';
import { Media } from '../media/entities';
import { MailerService } from '@nestjs-modules/mailer';
import { OtpEntity } from '../otp/entities';
import { RequestHeader, TransformData } from '../../interface';
export declare class AuthService {
    private readonly accountRepository;
    private readonly jwtService;
    private readonly branchRepository;
    private readonly mediaRepository;
    private readonly otpRepository;
    private readonly mailerService;
    constructor(accountRepository: Repository<Account>, jwtService: JwtService, branchRepository: Repository<Branch>, mediaRepository: Repository<Media>, otpRepository: Repository<OtpEntity>, mailerService: MailerService);
    onLogin(body: SysLoginGTO): Promise<TransformData<any>>;
    generateToken(id: number, email: string, branch_id: number): Promise<string>;
    onProfile(req: RequestHeader<Account>): Promise<TransformData<Account>>;
    onUpdateProfile(req: RequestHeader<Account>, body: SysUpdateProfileDTO): Promise<TransformData<Account>>;
    findAllRoleByUser(req: RequestHeader<Account>): Promise<{
        data: import("../role/entities").Role[];
    }>;
    findBranchByUser(req: RequestHeader<Account>): Promise<TransformData<Branch[]>>;
    forgot(req: Request, body: SysForgot): Promise<{
        message: string;
    }>;
}
