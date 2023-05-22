import { CustomerService } from './customer.service';
import { QueryCustomerDTO } from './dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto): Promise<import("./entities").Customer>;
    findAll(query: QueryCustomerDTO): Promise<import("../../interface").TransformData<import("./entities").Customer[]>>;
    findOne(id: string): Promise<import("../../interface").TransformData<import("./entities").Customer>>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
