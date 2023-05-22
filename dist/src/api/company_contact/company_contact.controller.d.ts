import { CompanyContactService } from './company_contact.service';
import { CreateCompanyContactDto } from './dto/create-company_contact.dto';
import { UpdateCompanyContactDto } from './dto/update-company_contact.dto';
export declare class CompanyContactController {
    private readonly companyContactService;
    constructor(companyContactService: CompanyContactService);
    create(createCompanyContactDto: CreateCompanyContactDto): Promise<import("../../interface").TransformData<import("./entities").CompanyContact>>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCompanyContactDto: UpdateCompanyContactDto): string;
}
