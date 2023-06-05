import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
export declare class PaymentMethodController {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    create(createPaymentMethodDto: CreatePaymentMethodDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): string;
    remove(id: string): string;
}
