import { Branch } from 'src/api/branches/entities';
import { Food } from 'src/api/food/entities';
export declare class FoodCate {
    id: number;
    branch: Branch;
    name: string;
    description: string;
    status: boolean;
    deleted: boolean;
    updated_at: Date;
    created_at: Date;
    foods: Food[];
}
