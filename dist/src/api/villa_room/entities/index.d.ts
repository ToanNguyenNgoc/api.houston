import { Media } from '../../media/entities';
import { Villa } from '../../villa/entities';
export declare class VillaRoom {
    id: number;
    name: string;
    description: string;
    thumbnail: Media;
    villa: Villa;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
}
