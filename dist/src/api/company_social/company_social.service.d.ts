import { CreateCompanySocialDto } from './dto/create-company_social.dto';
import { UpdateCompanySocialDto } from './dto/update-company_social.dto';
export declare class CompanySocialService {
    create(createCompanySocialDto: CreateCompanySocialDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCompanySocialDto: UpdateCompanySocialDto): string;
    remove(id: number): string;
}
