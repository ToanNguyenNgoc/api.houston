/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Villa } from './entities';
import { Repository } from 'typeorm';
import { encode } from '../../utils';
import { key } from '../../common';

@Injectable()
export class VillaGuard implements CanActivate {
  constructor(
    @InjectRepository(Villa)
    private readonly villaRe: Repository<Villa>,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest()
    const codes = user.roles?.map(role => role.code)
    if (codes?.includes(encode(key.SUPER_ADMIN))) {
      return true
    }
    const villaUpdate = await this.villaRe
      .createQueryBuilder('tb_villa')
      .where({ id: params.id })
      .leftJoinAndSelect('tb_villa.villa_cate', 'tb_villa_cate')
      .leftJoin('tb_villa_cate.branch', 'tb_branch')
      .addSelect(['tb_branch.id'])
      .getOne()
    if (!villaUpdate) throw new NotFoundException('Cannot found !')
    if (user.branch?.id !== villaUpdate.villa_cate?.branch?.id) {
      throw new ForbiddenException('You only update villa your branch !')
    }
    return true;
  }
}
