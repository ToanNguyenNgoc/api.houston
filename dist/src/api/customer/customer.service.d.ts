import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Media } from '../media/entities';
import { CustomerOriginal } from '../customer_original/entities';
import { QueryCustomerDTO } from './dto';
import { TransformData } from '../../interface';
export declare class CustomerService {
    private readonly customerRepository;
    private readonly mediaRe;
    private readonly CustomerOriginalRe;
    constructor(customerRepository: Repository<Customer>, mediaRe: Repository<Media>, CustomerOriginalRe: Repository<CustomerOriginal>);
    create(body: CreateCustomerDto): Promise<Customer>;
    findAll(query: QueryCustomerDTO): Promise<TransformData<Customer[]>>;
    findOne(id: string): Promise<TransformData<Customer>>;
    update(id: string, body: UpdateCustomerDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
