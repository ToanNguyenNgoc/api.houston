import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformData } from '../../interface';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) { }
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const paths = createPermissionDto
        .permission_path
        .map(path => {
          const path_item = [
            `api.${path}.GET`,
            `api.${path}.POST`,
            `api.${path}.:id.GET`,
            `api.${path}.:id.PUT`,
            `api.${path}.:id.DELETE`,
          ]
          return path_item
        })
        .flat()
      const values = paths.map(i => {
        return { permission_path: i }
      })
      await this.permissionRepository
        .createQueryBuilder('tb_permission')
        .insert()
        .into(Permission)
        .values(values)
        .execute()
      return { message: 'Create success' }
    } catch (error) {
      throw new BadRequestException('An error')
    }
  }
  async findAll(): Promise<TransformData<Permission>> {
    const response = await this
      .permissionRepository
      .createQueryBuilder('tb_permission')
      .getManyAndCount()
    return {
      data: response[0],
      total: response[1]
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }
}
