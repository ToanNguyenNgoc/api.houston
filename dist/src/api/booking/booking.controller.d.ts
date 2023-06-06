import { BookingService } from './booking.service';
import { CreateBookingCustomerDto, CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Account } from '../account/entities';
import { Customer } from '../customer/entities';
import { QueryBooking, QueryBookingCustomer } from './dto';
import { RequestHeader } from '../../interface';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(req: RequestHeader<Account>, createBookingDto: CreateBookingDto): Promise<{
        data: import("./entities").Booking;
    }>;
    findAll(req: RequestHeader<Account>, query: QueryBooking): Promise<import("../../interface").TransformData<import("./entities").Booking[]>>;
    findOne(req: RequestHeader<Account>, id: string): Promise<{
        data: import("./entities").Booking;
    }>;
    update(req: RequestHeader<Account>, id: string, body: UpdateBookingDto): Promise<{
        status: string;
    }>;
    remove(id: string): Promise<{
        data: string;
    }>;
}
export declare class BookingCustomerController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(req: RequestHeader<Customer>, body: CreateBookingCustomerDto): Promise<{
        data: import("./entities").Booking;
    }>;
    findAll(req: RequestHeader<Customer>, query: QueryBookingCustomer): Promise<import("../../interface").TransformData<import("./entities").Booking[]>>;
    findOne(req: RequestHeader<Customer>, id: string): Promise<{
        data: import("./entities").Booking;
    }>;
}
