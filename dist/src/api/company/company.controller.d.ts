import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(createCompanyDto: CreateCompanyDto): Promise<{
        data: import("./entities").Company;
    }>;
    findAll(): Promise<import("../../interface").TransformData<import("./entities").Company>>;
    findOne(id: string): string;
    update(id: string, updateCompanyDto: UpdateCompanyDto): string;
}
