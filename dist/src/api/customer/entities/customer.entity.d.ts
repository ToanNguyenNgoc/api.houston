import { Media } from '../../media/entities';
import { CustomerOriginal } from '../../customer_original/entities';
import { Booking } from '../../booking/entities';
export declare class Customer {
    id: number;
    fullname: string;
    avatar: Media;
    telephone: string;
    email: string;
    password: string;
    sex: boolean;
    dob: Date;
    ccid: string;
    job: string;
    full_address: string;
    country: string;
    status: boolean;
    deleted: boolean;
    customer_original: CustomerOriginal;
    created_at: Date;
    updated_at: Date;
    bookings: Booking[];
    email_transfer: string;
}
