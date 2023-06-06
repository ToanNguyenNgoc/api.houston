import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
export declare class PaymentMethodController {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<{
        data: import("typeorm").InsertResult;
        message?: undefined;
    } | {
        message: string;
        data?: undefined;
    }>;
    findAll(): Promise<import("../../interface").TransformData<import("./entities").PaymentMethod[]>>;
    findOne(id: string): Promise<{
        data: import("./entities").PaymentMethod;
    }>;
    update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): string;
    remove(id: string): string;
}
