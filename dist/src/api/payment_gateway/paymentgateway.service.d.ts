import { PaymentGateway } from 'src/api/payment_gateway/entities';
import { Repository } from 'typeorm';
import { Request, Response } from "express";
import { Booking } from 'src/api/booking/entities';
import { RequestHeader } from 'src/interface';
import { Customer } from 'src/api/customer/entities';
import { QueryVnpay } from 'src/api/payment_gateway/dto';
export declare class PaymentGatewayService {
    private readonly bookingRe;
    private readonly paymentGatewayRe;
    constructor(bookingRe: Repository<Booking>, paymentGatewayRe: Repository<PaymentGateway>);
    updateStatus(req: Request, query: any, res: Response): Promise<void>;
    status(req: RequestHeader<Customer>, qr: QueryVnpay): Promise<{
        data: Booking;
    }>;
}
