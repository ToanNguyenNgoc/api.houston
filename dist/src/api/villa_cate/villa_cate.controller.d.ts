import { VillaCateService } from './villa_cate.service';
import { CreateVillaCateDto } from './dto/create-villa_cate.dto';
import { UpdateVillaCateDto } from './dto/update-villa_cate.dto';
import { QueryVillaCateDTO } from './dto';
export declare class VillaCateController {
    private readonly villaCateService;
    constructor(villaCateService: VillaCateService);
    create(createVillaCateDto: CreateVillaCateDto): Promise<import("../../interface").TransformData<import("./entities").VillaCate>>;
    findAll(query: QueryVillaCateDTO): Promise<import("../../interface").TransformData<import("./entities").VillaCate[]>>;
    findOne(id: string): Promise<import("../../interface").TransformData<import("./entities").VillaCate>>;
    update(id: string, updateVillaCateDto: UpdateVillaCateDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
