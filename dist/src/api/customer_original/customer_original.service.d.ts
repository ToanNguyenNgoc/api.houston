import { Repository } from 'typeorm';
import { CreateCustomerOriginalDto } from './dto/create-customer_original.dto';
import { UpdateCustomerOriginalDto } from './dto/update-customer_original.dto';
import { CustomerOriginal } from './entities';
import { TransformData, TransformMessage } from '../../interface';
export declare class CustomerOriginalService {
    private readonly cusOriRepository;
    constructor(cusOriRepository: Repository<CustomerOriginal>);
    create(body: CreateCustomerOriginalDto): Promise<TransformData<CustomerOriginal>>;
    findAll(): Promise<TransformData<CustomerOriginal[]>>;
    findOne(id: number): Promise<TransformData<CustomerOriginal>>;
    update(id: number, body: UpdateCustomerOriginalDto): Promise<TransformMessage>;
}
