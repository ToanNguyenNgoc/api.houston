import { CompanySocial } from '../../company_social/entities';
import { CompanyContact } from '../../company_contact/entities';
export declare class Company {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    socials: CompanySocial[];
    contacts: CompanyContact[];
}
