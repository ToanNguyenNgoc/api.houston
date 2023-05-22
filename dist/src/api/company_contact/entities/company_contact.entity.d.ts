import { Company } from '../../company/entities';
export declare class CompanyContact {
    id: number;
    contact_type: string;
    contact_info: string;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    company: Company;
}
