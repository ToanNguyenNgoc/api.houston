import { BannerService } from './banner.service';
import { CreateBannerDto, QueryBannerDTO, UpdateBannerDto } from './dto';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    create(body: CreateBannerDto): Promise<import("../../interface").TransformData<import("./entities").Banner>>;
    findAll(query: QueryBannerDTO): Promise<import("../../interface").TransformData<import("./entities").Banner[]>>;
    findOne(id: string): Promise<import("../../interface").TransformData<import("./entities").Banner>>;
    update(id: string, updateBannerDto: UpdateBannerDto): Promise<{
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
