import { Branch } from '../../branches/entities';
import { Role } from '../../role/entities';
import { Media } from '../../media/entities';
import { Booking } from '../../booking/entities';
export declare class Account {
    id: number;
    telephone: string;
    email: string;
    fullname: string;
    password: string;
    status: boolean;
    description: string;
    sex: boolean;
    full_address: string;
    ccid: string;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    roles: Role[];
    branch: Branch;
    media: Media;
    bookings: Booking[];
}
