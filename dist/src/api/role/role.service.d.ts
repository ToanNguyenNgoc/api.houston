import { Repository } from 'typeorm';
import { CreateRoleDTO, QueryRoleDTO, UpdateRoleDTO } from './dto';
import { Role } from './entities';
import { Permission } from '../permission/entities/permission.entity';
import { TransformData } from '../../interface';
export declare class RoleService {
    private readonly roleRepository;
    private readonly permissionRep;
    constructor(roleRepository: Repository<Role>, permissionRep: Repository<Permission>);
    fillAll(query: QueryRoleDTO): Promise<TransformData<Role>>;
    findOne(id: number): Promise<TransformData<Role>>;
    create(body: CreateRoleDTO): Promise<Role>;
    update(id: number, body: UpdateRoleDTO): Promise<import("typeorm").UpdateResult>;
}
