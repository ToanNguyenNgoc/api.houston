import { Customer } from "src/api/customer/entities";
import { RequestHeader } from "src/interface";
interface ICreatePayment {
    req: RequestHeader<Customer>;
    amount: number;
    bankCode: "VNPAYQR" | "VNBANK" | "INTCARD" | any;
}
export declare class VnpayService {
    createPaymentGateway({ req, amount, bankCode }: ICreatePayment): {
        transaction: string;
        txn_ref: any;
        payment_url: string;
        callback_url: string;
        secure_hash: string;
    };
}
export {};
