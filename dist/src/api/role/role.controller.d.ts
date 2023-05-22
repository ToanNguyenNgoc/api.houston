import { CreateRoleDTO, QueryRoleDTO, UpdateRoleDTO } from './dto';
import { RoleService } from './role.service';
import { Request } from 'express';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    findAll(query: QueryRoleDTO): Promise<import("../../interface").TransformData<import("./entities").Role>>;
    findOne(id: number): Promise<import("../../interface").TransformData<import("./entities").Role>>;
    create(body: CreateRoleDTO): Promise<import("./entities").Role>;
    update(request: Request, id: number, body: UpdateRoleDTO): Promise<import("typeorm").UpdateResult>;
}
