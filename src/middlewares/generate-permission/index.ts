/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Permission } from 'src/api/permission/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneratePermissionMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) { }
  async use(req: Request, res: Response, next: Function) {
    const path = req.route.path.split('/').filter(Boolean)[0]
    try {
      await this.permissionRepository
        .createQueryBuilder('tb_permission')
        .insert()
        .into(Permission)
        .values([
          { permission_path: `api.${path}.GET` },
          { permission_path: `api.${path}.POST` },
          { permission_path: `api.${path}.:id.GET` },
          { permission_path: `api.${path}.:id.PUT` },
          { permission_path: `api.${path}.:id.DELETE` },
        ])
        .execute()
    } catch (error) {
    }
    next();
  }
}
