import { Branch } from 'src/api/branches/entities';
import { FoodCate } from 'src/api/food_cate/entities';
import { Media } from 'src/api/media/entities';
export declare class Food {
    id: number;
    name: string;
    media: Media;
    food_cate: FoodCate;
    branch: Branch;
    description: string;
    status: boolean;
    deleted: boolean;
    updated_at: Date;
    created_at: Date;
}
