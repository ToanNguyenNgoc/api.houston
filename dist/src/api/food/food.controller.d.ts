import { FoodService } from './food.service';
import { CreateFoodDto, QrFoodDTO, UpdateFoodDto } from './dto';
import { RequestHeader } from 'src/interface';
import { Account } from 'src/api/account/entities';
export declare class FoodController {
    private readonly foodService;
    constructor(foodService: FoodService);
    create(req: RequestHeader<Account>, body: CreateFoodDto): Promise<import("src/interface").TransformData<import("./entities").Food>>;
    findAll(qr: QrFoodDTO): Promise<import("src/interface").TransformData<import("./entities").Food[]>>;
    findOne(id: string): Promise<import("src/interface").TransformData<import("./entities").Food>>;
    update(id: string, body: UpdateFoodDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
