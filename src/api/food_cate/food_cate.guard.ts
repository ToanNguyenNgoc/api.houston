/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodCate } from 'src/api/food_cate/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FoodCateGuard implements CanActivate {
  constructor(
    @InjectRepository(FoodCate)
    private readonly foodCateRep: Repository<FoodCate>,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest()
    const foodCateUp = await this.foodCateRep
      .createQueryBuilder('tb_food_cate')
      .where({ id: params.id })
      .leftJoin('tb_food_cate.branch', 'tb_branch')
      .addSelect(['tb_branch.id'])
      .getOne()
    if (!foodCateUp) throw new NotFoundException('Cannot found !')
    if (user.branch?.id !== foodCateUp.branch?.id) {
      throw new ForbiddenException('You only handle food cate your branch !')
    }
    return true;
  }
}
