import { CanActivate, ExecutionContext } from '@nestjs/common';
import { VillaCate } from './entities';
import { Repository } from 'typeorm';
export declare class VillaCateGuard implements CanActivate {
    private readonly villaCateRe;
    constructor(villaCateRe: Repository<VillaCate>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
