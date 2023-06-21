import { CanActivate, ExecutionContext } from '@nestjs/common';
import { FoodCate } from 'src/api/food_cate/entities';
import { Repository } from 'typeorm';
export declare class FoodCateGuard implements CanActivate {
    private readonly foodCateRep;
    constructor(foodCateRep: Repository<FoodCate>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
