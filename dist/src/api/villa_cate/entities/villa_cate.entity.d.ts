import { Media } from '../../media/entities';
import { Branch } from '../../branches/entities';
import { Villa } from '../../villa/entities';
export declare class VillaCate {
    id: number;
    villa_cate_name: string;
    description: string;
    villa_cate_image: Media;
    branch: Branch;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    villas: Villa[];
}
