import { Injectable, CanActivate, ExecutionContext, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/api/food/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FoodGuard implements CanActivate {
  constructor(
    @InjectRepository(Food)
    private readonly foodRep: Repository<Food>,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest()
    const foodUp = await this.foodRep
      .createQueryBuilder('tb_food')
      .where({ id: params.id })
      .leftJoin('tb_food.branch', 'tb_branch')
      .addSelect(['tb_branch.id'])
      .getOne()
    if (!foodUp) throw new NotFoundException('Cannot found !')
    if (!user.branch?.id || user.branch?.id !== foodUp.branch?.id) {
      throw new ForbiddenException('You only handle food your branch !')
    }
    return true;
  }
}
