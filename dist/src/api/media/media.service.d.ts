/// <reference types="multer" />
import { Repository } from 'typeorm';
import { Media } from './entities';
import { TransformData } from '../../interface';
import { CloudinaryService } from 'nestjs-cloudinary';
export declare class MediaService {
    private readonly mediaRepository;
    private readonly cloudinaryService;
    constructor(mediaRepository: Repository<Media>, cloudinaryService: CloudinaryService);
    create(file: Express.Multer.File): Promise<TransformData<Media>>;
    createWithCloud(file: Express.Multer.File): Promise<TransformData<Media>>;
}
