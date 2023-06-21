import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Food } from 'src/api/food/entities';
import { Repository } from 'typeorm';
export declare class FoodGuard implements CanActivate {
    private readonly foodRep;
    constructor(foodRep: Repository<Food>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
