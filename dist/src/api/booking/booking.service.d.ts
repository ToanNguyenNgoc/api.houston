import { CreateBookingCustomerDto, CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Branch } from '../branches/entities';
import { Repository } from 'typeorm';
import { Villa } from '../villa/entities';
import { Customer } from '../customer/entities';
import { Account } from '../account/entities';
import { Booking } from './entities';
import { QueryBooking, QueryBookingCustomer } from './dto';
import { SendMailService } from '../../services';
import { RequestHeader } from '../../interface';
export declare class BookingService {
    private readonly branchRe;
    private readonly villaRe;
    private readonly customerRe;
    private readonly accountRe;
    private readonly bookingRe;
    private readonly sendMail;
    constructor(branchRe: Repository<Branch>, villaRe: Repository<Villa>, customerRe: Repository<Customer>, accountRe: Repository<Account>, bookingRe: Repository<Booking>, sendMail: SendMailService);
    create(req: RequestHeader<Account>, body: CreateBookingDto): Promise<{
        data: Booking;
    }>;
    findAll(req: RequestHeader<Account>, query: QueryBooking): Promise<import("../../interface").TransformData<Booking[]>>;
    findOne(req: RequestHeader<Account>, id: string): Promise<{
        data: Booking;
    }>;
    update(req: RequestHeader<Account>, id: string, body: UpdateBookingDto): Promise<{
        status: string;
    }>;
    remove(id: string): Promise<{
        data: string;
    }>;
    createByCustomer(req: RequestHeader<Customer>, body: CreateBookingCustomerDto): Promise<{
        data: Booking;
    }>;
    findAllByCustomer(req: RequestHeader<Customer>, query: QueryBookingCustomer): Promise<import("../../interface").TransformData<Booking[]>>;
    findOneByCustomer(req: RequestHeader<Customer>, id: string): Promise<{
        data: Booking;
    }>;
}
