import { CustomerOriginalService } from './customer_original.service';
import { CreateCustomerOriginalDto } from './dto/create-customer_original.dto';
import { UpdateCustomerOriginalDto } from './dto/update-customer_original.dto';
export declare class CustomerOriginalController {
    private readonly customerOriginalService;
    constructor(customerOriginalService: CustomerOriginalService);
    create(createCustomerOriginalDto: CreateCustomerOriginalDto): Promise<import("../../interface").TransformData<import("./entities").CustomerOriginal>>;
    findAll(): Promise<import("../../interface").TransformData<import("./entities").CustomerOriginal[]>>;
    findOne(id: string): Promise<import("../../interface").TransformData<import("./entities").CustomerOriginal>>;
    update(id: string, updateCustomerOriginalDto: UpdateCustomerOriginalDto): Promise<import("../../interface").TransformMessage>;
}
