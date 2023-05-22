import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities';
import { TransformData } from '../../interface';
import { QueryBranchDTO } from './dto';
import { District, Province, Ward } from '../province/entities';
import { Media } from '../media/entities';
import { Villa } from '../villa/entities';
import { VillaGallery } from '../villa_gallery/entities';
export declare class BranchesService {
    private readonly branchRepository;
    private readonly mediaRepository;
    private readonly provinceRepository;
    private readonly districtRepository;
    private readonly wardRepository;
    private readonly villaRepository;
    private readonly villaGalleryRe;
    constructor(branchRepository: Repository<Branch>, mediaRepository: Repository<Media>, provinceRepository: Repository<Province>, districtRepository: Repository<District>, wardRepository: Repository<Ward>, villaRepository: Repository<Villa>, villaGalleryRe: Repository<VillaGallery>);
    create(body: CreateBranchDto): Promise<TransformData<Branch>>;
    findAll(query: QueryBranchDTO): Promise<TransformData<Branch[]>>;
    findOne(id: number): Promise<TransformData<Branch>>;
    update(id: string, body: UpdateBranchDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findGalleriesById(id: string): Promise<{
        data: any[];
    }>;
}
