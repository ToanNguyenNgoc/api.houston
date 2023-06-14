import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entities';
import { ForgotAuthCustomer, LoginAuthCusDTO, RegisterAuthCustomerDTO, UpdateAuthCustomerDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { RequestHeader } from '../../interface';
import { OtpEntity } from '../otp/entities';
import { SendMailService } from '../../services';
import { Media } from '../media/entities';
import { RefreshToken } from '../refresh_token/entities';
import { Account } from '../account/entities';
export declare class AuthCustomerService {
    private readonly customerRe;
    private readonly otpRe;
    private readonly mediaRe;
    private readonly refreshTokenRe;
    private readonly jwtService;
    private readonly sendMailService;
    constructor(customerRe: Repository<Customer>, otpRe: Repository<OtpEntity>, mediaRe: Repository<Media>, refreshTokenRe: Repository<RefreshToken>, jwtService: JwtService, sendMailService: SendMailService);
    login(req: Request, body: LoginAuthCusDTO, res: Response): Promise<void>;
    refreshToken(req: RequestHeader<Account>, res: Response): Promise<void>;
    generateToken(id: number, email: string): Promise<any>;
    generateRefreshToken(req: Request, id: number, email: string): Promise<string>;
    profile(req: RequestHeader<Customer>): Promise<{
        data: Customer;
    }>;
    register(body: RegisterAuthCustomerDTO): Promise<{
        message: string;
        data?: undefined;
    } | {
        data: Customer;
        message?: undefined;
    }>;
    updateProfile(req: RequestHeader<Customer>, body: UpdateAuthCustomerDto): Promise<{
        data: {
            avatar: {
                original_url: string;
            };
            fullname: string;
            telephone: string;
            sex: boolean;
            full_address: string;
            dob: Date;
            ccid: string;
            job: string;
            media_id?: number;
            country: string;
            id: number;
            email: string;
            password: string;
            status: boolean;
            deleted: boolean;
            customer_original: import("../customer_original/entities").CustomerOriginal;
            created_at: Date;
            updated_at: Date;
            bookings: import("../booking/entities").Booking[];
            email_transfer: string;
            social_platform: string;
            social_id: string;
            social_avatar: string;
        };
    }>;
    forgot(body: ForgotAuthCustomer): Promise<{
        message: string;
    }>;
    removeOtp(email: string, code: string): Promise<void>;
    logout(res: Response): Promise<void>;
}
