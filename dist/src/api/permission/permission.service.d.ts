import { TransformData } from '../../interface';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    create(createPermissionDto: CreatePermissionDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<TransformData<Permission>>;
    findOne(id: number): string;
}
