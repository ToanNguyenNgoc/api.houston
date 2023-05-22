import { Repository } from 'typeorm';
import { CompanySocial } from '../company_social/entities';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities';
import { Media } from '../media/entities';
import { CompanyContact } from '../company_contact/entities';
import { TransformData } from '../../interface';
export declare class CompanyService {
    private readonly companyRe;
    private readonly companySocialRe;
    private readonly mediaRe;
    private readonly contactRe;
    constructor(companyRe: Repository<Company>, companySocialRe: Repository<CompanySocial>, mediaRe: Repository<Media>, contactRe: Repository<CompanyContact>);
    create(body: CreateCompanyDto): Promise<{
        data: Company;
    }>;
    findAll(): Promise<TransformData<Company>>;
    findOne(id: number): string;
    update(id: number, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: number): string;
}
