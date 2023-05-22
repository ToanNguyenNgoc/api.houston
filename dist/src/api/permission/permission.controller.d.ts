import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: CreatePermissionDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("../../interface").TransformData<import("./entities/permission.entity").Permission>>;
}
