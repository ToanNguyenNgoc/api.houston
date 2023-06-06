import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from "./entities";
import { Repository } from 'typeorm';
export declare class PaymentMethodService {
    private readonly paymentMethodRep;
    constructor(paymentMethodRep: Repository<PaymentMethod>);
    create(body: CreatePaymentMethodDto): Promise<{
        data: import("typeorm").InsertResult;
        message?: undefined;
    } | {
        message: string;
        data?: undefined;
    }>;
    findAll(): Promise<import("../../interface").TransformData<PaymentMethod[]>>;
    findOne(id: string): Promise<{
        data: PaymentMethod;
    }>;
    update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): string;
    remove(id: number): string;
}
