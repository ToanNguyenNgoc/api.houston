import { Response, Request } from "express";
import { QueryVnpay } from "./dto";
export declare class PaymentGatewayController {
    vnpayCallBackUrl(req: Request, query: any, res: Response): Promise<void>;
    vnpayStatus(res: Response, query: QueryVnpay): Response<any, Record<string, any>>;
}
