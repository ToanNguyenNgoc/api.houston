import { CreateFoodDto, QrFoodDTO, UpdateFoodDto } from './dto';
import { Account } from 'src/api/account/entities';
import { Branch } from 'src/api/branches/entities';
import { Repository } from 'typeorm';
import { FoodCate } from 'src/api/food_cate/entities';
import { Media } from 'src/api/media/entities';
import { Food } from 'src/api/food/entities';
import { TransformData } from 'src/interface';
export declare class FoodService {
    private readonly branchRep;
    private readonly foodCateRep;
    private readonly mediaRep;
    private readonly foodRep;
    constructor(branchRep: Repository<Branch>, foodCateRep: Repository<FoodCate>, mediaRep: Repository<Media>, foodRep: Repository<Food>);
    create(user: Account, body: CreateFoodDto): Promise<TransformData<Food>>;
    findAll(qr: QrFoodDTO): Promise<TransformData<Food[]>>;
    findOne(id: string): Promise<TransformData<Food>>;
    update(id: string, body: UpdateFoodDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
