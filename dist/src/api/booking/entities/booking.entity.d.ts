import { Customer } from '../../customer/entities';
import { Account } from '../../account/entities';
import { Villa } from '../../villa/entities';
import { Branch } from '../../branches/entities';
export declare class Booking {
    id: number;
    customer: Customer;
    note: string;
    employee: Account;
    employee_update: Account;
    villa: Villa;
    branch: Branch;
    from_date_booking: Date;
    to_date_booking: Date;
    nights: number;
    customer_count: number;
    baby_count: number;
    status_booking: string;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    amount: number;
    booking_platform: string;
}
