import { CreateCustomerDto } from './create-customer.dto';
declare const UpdateCustomerDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCustomerDto>>;
export declare class UpdateCustomerDto extends UpdateCustomerDto_base {
    fullname: string;
    telephone: string;
    sex: boolean;
    status: boolean;
    full_address: string;
    country: string;
    dob: Date;
    ccid: string;
    job: string;
    media_id: number;
    customerOriginalId: number;
}
export {};
