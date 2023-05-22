import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Booking } from './entities';
import { Repository } from 'typeorm';
export declare class BookingGuard implements CanActivate {
    private readonly bookingRe;
    constructor(bookingRe: Repository<Booking>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
