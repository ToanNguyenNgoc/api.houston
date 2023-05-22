import { CompanySocialService } from './company_social.service';
import { CreateCompanySocialDto } from './dto/create-company_social.dto';
import { UpdateCompanySocialDto } from './dto/update-company_social.dto';
export declare class CompanySocialController {
    private readonly companySocialService;
    constructor(companySocialService: CompanySocialService);
    create(createCompanySocialDto: CreateCompanySocialDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCompanySocialDto: UpdateCompanySocialDto): string;
}
