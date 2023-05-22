import { Villa } from '../villa/entities';
import { Repository } from 'typeorm';
import { VillaGallery } from './entities';
import { Media } from '../media/entities';
import { CreateVillaGalleryDTO, QueryVillaGalleryDTO, UpdateVillaGalleryDTO } from './dto';
import { TransformData } from '../../interface';
export declare class VillaGalleryService {
    private readonly villaRe;
    private readonly villaGalleryRe;
    private readonly mediaRe;
    constructor(villaRe: Repository<Villa>, villaGalleryRe: Repository<VillaGallery>, mediaRe: Repository<Media>);
    create(body: CreateVillaGalleryDTO): Promise<{
        data: {
            villa: Villa;
            image: Media;
        }[];
    }>;
    findAll(query: QueryVillaGalleryDTO): Promise<TransformData<VillaGallery[]>>;
    update(id: string, body: UpdateVillaGalleryDTO): Promise<void>;
}
