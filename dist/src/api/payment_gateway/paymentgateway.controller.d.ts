import { Response } from "express";
import { QueryVnpay } from "./dto";
export declare class PaymentGatewayController {
    vnpayStatus(res: Response, query: QueryVnpay): void;
}
