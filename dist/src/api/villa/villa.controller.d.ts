import { VillaService } from './villa.service';
import { CreateVillaDto } from './dto/create-villa.dto';
import { UpdateVillaDto } from './dto/update-villa.dto';
import { QueryByIdVillaDTO, QueryVillaDTO } from './dto';
import { RequestHeader } from '../../interface';
import { Account } from '../account/entities';
export declare class VillaController {
    private readonly villaService;
    constructor(villaService: VillaService);
    create(req: RequestHeader<Account>, createVillaDto: CreateVillaDto): Promise<import("../../interface").TransformData<import("./entities").Villa>>;
    findAll(query: QueryVillaDTO): Promise<import("../../interface").TransformData<import("./entities").Villa[]>>;
    findOne(id: string, query: QueryByIdVillaDTO): Promise<import("../../interface").TransformData<import("./entities").Villa>>;
    update(req: RequestHeader<Account>, id: string, updateVillaDto: UpdateVillaDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
