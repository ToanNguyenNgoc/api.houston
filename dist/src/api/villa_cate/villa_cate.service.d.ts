import { CreateVillaCateDto } from './dto/create-villa_cate.dto';
import { UpdateVillaCateDto } from './dto/update-villa_cate.dto';
import { VillaCate } from './entities';
import { Repository } from 'typeorm';
import { Branch } from '../branches/entities';
import { Media } from '../media/entities';
import { TransformData } from '../../interface';
import { QueryVillaCateDTO } from './dto';
export declare class VillaCateService {
    private readonly villaCateRe;
    private readonly branchRe;
    private readonly mediaRe;
    constructor(villaCateRe: Repository<VillaCate>, branchRe: Repository<Branch>, mediaRe: Repository<Media>);
    create(body: CreateVillaCateDto): Promise<TransformData<VillaCate>>;
    findAll(query: QueryVillaCateDTO): Promise<TransformData<VillaCate[]>>;
    findOne(id: string): Promise<TransformData<VillaCate>>;
    update(id: string, body: UpdateVillaCateDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
