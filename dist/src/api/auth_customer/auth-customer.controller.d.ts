import { AuthCustomerService } from './auth-customer.service';
import { ForgotAuthCustomer, LoginAuthCusDTO, RegisterAuthCustomerDTO, UpdateAuthCustomerDto } from './dto';
import { Customer } from '../customer/entities';
import { Request, Response } from 'express';
import { RequestHeader } from '../../interface';
import { Account } from 'src/api/account/entities';
export declare class AuthCustomerController {
    private readonly authCustomerService;
    constructor(authCustomerService: AuthCustomerService);
    register(body: RegisterAuthCustomerDTO): Promise<{
        message: string;
        data?: undefined;
    } | {
        data: Customer;
        message?: undefined;
    }>;
    login(req: Request, body: LoginAuthCusDTO, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    refreshToken(req: RequestHeader<Account>, res: Response): Promise<void>;
    forgot(body: ForgotAuthCustomer): Promise<{
        message: string;
    }>;
    profile(req: RequestHeader<Customer>): Promise<{
        data: Customer;
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
}
