import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
export declare class PaymentMethodService {
    create(createPaymentMethodDto: CreatePaymentMethodDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): string;
    remove(id: number): string;
}
