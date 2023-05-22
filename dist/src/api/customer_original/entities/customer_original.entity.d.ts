import { Customer } from '../../customer/entities';
export declare class CustomerOriginal {
    id: number;
    name: string;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    customers: Customer[];
}
