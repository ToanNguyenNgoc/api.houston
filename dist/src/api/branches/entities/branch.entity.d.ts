import { Media } from '../../media/entities';
import { Account } from '../../account/entities';
import { VillaCate } from '../../villa_cate/entities';
import { Villa } from '../../villa/entities';
import { District, Province, Ward } from '../../province/entities';
import { Booking } from '../../booking/entities';
export declare class Branch {
    id: number;
    name: string;
    image: Media;
    content: string;
    description: string;
    status: boolean;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    accounts: Account[];
    villa_cates: VillaCate[];
    villas: Villa;
    address: string;
    province: Province;
    district: District;
    ward: Ward;
    latitude: string;
    longitude: string;
    bookings: Booking[];
}
