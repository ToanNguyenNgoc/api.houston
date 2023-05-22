import { VillaGalleryService } from './villagallery.service';
import { CreateVillaGalleryDTO, QueryVillaGalleryDTO } from './dto';
export declare class VillaGalleryController {
    private readonly villaGalleryService;
    constructor(villaGalleryService: VillaGalleryService);
    create(body: CreateVillaGalleryDTO): Promise<{
        data: {
            villa: import("../villa/entities").Villa;
            image: import("../media/entities").Media;
        }[];
    }>;
    findAll(query: QueryVillaGalleryDTO): Promise<import("../../interface").TransformData<import("./entities").VillaGallery[]>>;
}
