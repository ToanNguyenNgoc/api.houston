import { Booking } from "../../booking/entities";
export declare class PaymentMethod {
    id: number;
    name: string;
    name_key: string;
    name_children: string;
    name_children_key: string;
    is_changeable: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    bookings: Booking[];
}
