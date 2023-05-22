import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Repository } from 'typeorm';
import { Banner } from './entities';
import { Media } from '../media/entities';
import { TransformData } from '../../interface';
import { QueryBannerDTO } from './dto';
export declare class BannerService {
    private readonly bannerRe;
    private readonly mediaRe;
    constructor(bannerRe: Repository<Banner>, mediaRe: Repository<Media>);
    create(body: CreateBannerDto): Promise<TransformData<Banner>>;
    findAll(query: QueryBannerDTO): Promise<TransformData<Banner[]>>;
    findOne(id: any): Promise<TransformData<Banner>>;
    update(id: string, body: UpdateBannerDto): Promise<{
        data: {
            media: {
                original_url: string;
            };
            name: string;
            media_id: number;
            type: string;
            content: string;
            url: string;
            original_id: string;
            status: boolean;
            id: number;
            deleted: boolean;
            updated_at: Date;
            created_at: Date;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
