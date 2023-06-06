import { Response, Request } from "express";
import { QueryVnpay } from "./dto";
import { PaymentGatewayService } from "./paymentgateway.service";
import { RequestHeader } from 'src/interface';
import { Customer } from 'src/api/customer/entities';
export declare class PaymentGatewayController {
    private readonly paymentGatewayService;
    constructor(paymentGatewayService: PaymentGatewayService);
    vnpayCallBackUrl(req: Request, query: any, res: Response): Promise<void>;
    status(req: RequestHeader<Customer>, query: QueryVnpay): Promise<{
        data: import("../booking/entities").Booking;
    }>;
}
