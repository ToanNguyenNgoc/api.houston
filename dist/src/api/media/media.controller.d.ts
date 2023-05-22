/// <reference types="multer" />
import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    create(file: Express.Multer.File): Promise<import("../../interface").TransformData<import("./entities").Media>>;
    createCloud(file: Express.Multer.File): Promise<import("../../interface").TransformData<import("./entities").Media>>;
}
