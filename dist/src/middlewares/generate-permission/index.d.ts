import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Permission } from 'src/api/permission/entities/permission.entity';
import { Repository } from 'typeorm';
export declare class GeneratePermissionMiddleware implements NestMiddleware {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    use(req: Request, res: Response, next: Function): Promise<void>;
}
