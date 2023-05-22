declare class QueryBase {
    page: string;
    limit: string;
    status_booking: string;
    includes: string;
}
export declare class QueryBookingCustomer extends QueryBase {
}
export declare class QueryBooking extends QueryBase {
    branch_id: number;
    booking_platform: string;
    min_amount: number;
    max_amount: number;
    filter_customer: string;
}
export {};
