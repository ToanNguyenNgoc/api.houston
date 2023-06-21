import { FoodCateService } from './food_cate.service';
import { CreateFoodCateDto } from './dto/create-food_cate.dto';
import { UpdateFoodCateDto } from './dto/update-food_cate.dto';
import { RequestHeader } from 'src/interface';
import { Account } from 'src/api/account/entities';
import { QrCateFoodDTO } from 'src/api/food_cate/dto';
export declare class FoodCateController {
    private readonly foodCateService;
    constructor(foodCateService: FoodCateService);
    create(req: RequestHeader<Account>, body: CreateFoodCateDto): Promise<{
        data: import("./entities").FoodCate;
    }>;
    findAll(qr: QrCateFoodDTO): Promise<import("src/interface").TransformData<import("./entities").FoodCate[]>>;
    findOne(id: string): Promise<import("src/interface").TransformData<import("./entities").FoodCate>>;
    update(id: string, body: UpdateFoodCateDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
