import { CreateFoodCateDto } from './dto/create-food_cate.dto';
import { UpdateFoodCateDto } from './dto/update-food_cate.dto';
import { Account } from 'src/api/account/entities';
import { Branch } from 'src/api/branches/entities';
import { Repository } from 'typeorm';
import { FoodCate } from 'src/api/food_cate/entities';
import { QrCateFoodDTO } from 'src/api/food_cate/dto';
import { TransformData } from 'src/interface';
export declare class FoodCateService {
    private readonly branchRep;
    private readonly foodCateRep;
    constructor(branchRep: Repository<Branch>, foodCateRep: Repository<FoodCate>);
    create(user: Account, body: CreateFoodCateDto): Promise<{
        data: FoodCate;
    }>;
    findAll(qr: QrCateFoodDTO): Promise<TransformData<FoodCate[]>>;
    findOne(id: string): Promise<TransformData<FoodCate>>;
    update(id: string, body: UpdateFoodCateDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
