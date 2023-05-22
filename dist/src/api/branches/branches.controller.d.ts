import { BranchesService } from './branches.service';
import { QueryBranchDTO } from './dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    create(createBranchDto: CreateBranchDto): Promise<import("../../interface").TransformData<import("./entities").Branch>>;
    findAll(query: QueryBranchDTO): Promise<import("../../interface").TransformData<import("./entities").Branch[]>>;
    findOne(id: string): Promise<import("../../interface").TransformData<import("./entities").Branch>>;
    update(id: string, updateBranchDto: UpdateBranchDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findGalleriesById(id: string): Promise<{
        data: any[];
    }>;
}
