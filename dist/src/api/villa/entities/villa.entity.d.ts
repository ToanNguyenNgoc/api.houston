import { Media } from "../../media/entities";
import { VillaGallery } from "../../villa_gallery/entities";
import { Branch } from "../../branches/entities";
import { VillaCate } from "../../villa_cate/entities";
import { VillaRoom } from "../../villa_room/entities";
export declare class Villa {
    id: string;
    name: string;
    thumbnail: Media;
    galleries: VillaGallery[];
    description: string;
    branch: Branch;
    villa_cate: VillaCate;
    price: number;
    special_price: number;
    holiday_price: number;
    weekend_price: number;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    bookings: Villa;
    acreage: number;
    rooms: VillaRoom[];
}
