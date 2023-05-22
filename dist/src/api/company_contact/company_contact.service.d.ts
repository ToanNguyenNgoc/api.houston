import { CreateCompanyContactDto } from './dto/create-company_contact.dto';
import { UpdateCompanyContactDto } from './dto/update-company_contact.dto';
import { CompanyContact } from './entities';
import { Repository } from 'typeorm';
import { TransformData } from '../../interface';
export declare class CompanyContactService {
    private readonly contactRe;
    constructor(contactRe: Repository<CompanyContact>);
    create(body: CreateCompanyContactDto): Promise<TransformData<CompanyContact>>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCompanyContactDto: UpdateCompanyContactDto): string;
    remove(id: number): string;
}
