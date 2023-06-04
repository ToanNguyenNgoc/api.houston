import { Customer } from "src/api/customer/entities";
import { RequestHeader } from "src/interface";
interface ICreatePayment {
    req: RequestHeader<Customer>;
}
export declare class VnpayService {
    createPaymentGateway({ req }: ICreatePayment): Promise<string>;
}
export {};
