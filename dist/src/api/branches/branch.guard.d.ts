import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Branch } from './entities';
import { Repository } from 'typeorm';
export declare class BranchGuard implements CanActivate {
    private readonly branchRepository;
    constructor(branchRepository: Repository<Branch>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
