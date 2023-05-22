import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Villa } from './entities';
import { Repository } from 'typeorm';
export declare class VillaGuard implements CanActivate {
    private readonly villaRe;
    constructor(villaRe: Repository<Villa>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
