import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateRoleDTO, QueryRoleDTO, UpdateRoleDTO } from './dto';
import { Role } from './entities';
import { Promise } from 'bluebird'
import { Permission } from '../permission/entities/permission.entity';
import { encode, convertBoolean } from '../../utils';
import { key } from '../../common';
import { TransformData } from '../../interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRep: Repository<Permission>
  ) { }
  async fillAll(query: QueryRoleDTO): Promise<TransformData<Role>> {
    const is_super_admin = convertBoolean(query.is_super_admin)
    try {
      const response = await this.roleRepository
        .createQueryBuilder('tb_role')
        .leftJoinAndSelect('tb_role.permissions', 'tb_permission')
        .where('tb_role.deleted =:deleted', { deleted: false })
        .where(is_super_admin === false ? { code: Not(encode('Super Admin')) } : {})
        .getMany()
      return { data: response }
    } catch (error) {
      throw new BadGatewayException(`${error}`)
    }
  }
  async findOne(id: number): Promise<TransformData<Role>> {
    const response = await this.roleRepository
      .createQueryBuilder('tb_role')
      .leftJoinAndSelect('tb_role.permissions', 'tb_permission')
      .where('tb_role.id=:id', { id: id })
      .getOne()
    if (!response) throw new NotFoundException(`Can not found`)
    return { data: response }
  }
  async create(body: CreateRoleDTO) {
    try {
      const role = new Role()
      role.title = body.title
      role.description = body.description
      role.code = encode(body.title)
      const permissions = await Promise.map(body.permissions ?? [], async (id: number) => {
        const item = await this.permissionRep
          .findOneBy({ id: id })
        return item
      })
      role.permissions = permissions
      const response = await this.roleRepository.save(role)
      return response
    } catch (error) {
      throw new BadGatewayException(`${error}`)
    }
  }
  async update(id: number, body: UpdateRoleDTO) {
    try {
      const role = await this.roleRepository.findOneBy({ id: id })
      if (role?.code === encode(key.SUPER_ADMIN)) {
        // throw new ForbiddenException('Cannot update this role')
        const response = await this.roleRepository
          .createQueryBuilder('role')
          .update(Role)
          .set({
            description: body.description
          })
          .execute()
        return response
      }
      const permissions = await Promise.map(body.permissions ?? [], async (permission_id: number) => {
        return await this.permissionRep.findOneBy({ id: permission_id })
      })
      if (body.permissions) role.permissions = permissions
      await this.roleRepository.save(role)
      const response = await this.roleRepository
        .createQueryBuilder()
        .update(Role)
        .set({
          title: body.title,
          description: body.description,
          status: body.status
        })
        .where("id = :id", { id: id })
        .execute()
      return response
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
}
