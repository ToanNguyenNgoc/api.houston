/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VillaCate } from './entities';
import { Repository } from 'typeorm';
import { encode } from '../../utils';
import { key } from '../../common';

@Injectable()
export class VillaCateGuard implements CanActivate {
  constructor(
    @InjectRepository(VillaCate)
    private readonly villaCateRe: Repository<VillaCate>
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest()
    const codes = user.roles?.map(role => role.code)
    if (codes?.includes(encode(key.SUPER_ADMIN))) {
      return true
    }
    const villaCate = await this.villaCateRe
      .createQueryBuilder('tb_villa_cate')
      .where({id:params.id})
      .leftJoin('tb_villa_cate.branch', 'tb_branch')
      .addSelect(['tb_branch.id'])
      .getOne()
    if (user.branch?.id !== villaCate?.branch?.id) {
      throw new ForbiddenException('You only update villa category your branch !')
    }
    return true;
  }
}
