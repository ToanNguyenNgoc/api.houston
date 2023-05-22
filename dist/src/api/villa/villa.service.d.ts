import { CreateVillaDto } from './dto/create-villa.dto';
import { UpdateVillaDto } from './dto/update-villa.dto';
import { VillaCate } from '../villa_cate/entities';
import { Repository } from 'typeorm';
import { Villa } from './entities';
import { Media } from '../media/entities';
import { QueryByIdVillaDTO, QueryVillaDTO } from './dto';
import { Branch } from '../branches/entities';
import { RequestHeader, TransformData } from '../../interface';
import { Account } from '../account/entities';
export declare class VillaService {
    private readonly branchRe;
    private readonly villaCateRe;
    private readonly villaRe;
    private readonly mediaRe;
    constructor(branchRe: Repository<Branch>, villaCateRe: Repository<VillaCate>, villaRe: Repository<Villa>, mediaRe: Repository<Media>);
    create(req: RequestHeader<Account>, body: CreateVillaDto): Promise<TransformData<Villa>>;
    findAll(query: QueryVillaDTO): Promise<TransformData<Villa[]>>;
    findOne(id: string, query: QueryByIdVillaDTO): Promise<TransformData<Villa>>;
    update(id: string, req: RequestHeader<Account>, body: UpdateVillaDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
