/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Branch } from './entities';
import { Repository } from 'typeorm';
import { encode } from '../../utils';
import { key } from '../../common';

@Injectable()
export class BranchGuard implements CanActivate {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest()
    const codes = user.roles?.map(role => role.code)
    if (codes?.includes(encode(key.SUPER_ADMIN))) {
      return true
    }
    const branchUpdate = await this.branchRepository
      .createQueryBuilder('tb_branch')
      .where({ id: params.id })
      .getOne()
    if (branchUpdate.id !== user.branch?.id) {
      throw new ForbiddenException('You only update you branch !')
    }
    return true;
  }
}
