export declare class CreateBookingDto {
    branch_id: number;
    customer_id: number;
    employee_id: number;
    villa_id: number;
    from_date_booking: Date;
    to_date_booking: Date;
    customer_count: number;
    baby_count: number;
    note: string;
}
export declare class CreateBookingCustomerDto {
    branch_id: number;
    villa_id: number;
    from_date_booking: Date;
    to_date_booking: Date;
    customer_count: number;
    baby_count: number;
    note: string;
    payment_method: string;
    payment_method_bank: string;
    recaptcha: string;
}
