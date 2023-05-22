import { Permission } from '../../permission/entities/permission.entity';
export declare class Role {
    id: number;
    title: string;
    code: string;
    status: boolean;
    deleted: boolean;
    description: string;
    created_at: Date;
    updated_at: Date;
    permissions: Permission[];
}
