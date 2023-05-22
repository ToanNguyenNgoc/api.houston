import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities';
import { TransformData } from '../../interface'
import { CloudinaryService } from 'nestjs-cloudinary';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly cloudinaryService: CloudinaryService
  ) { }
  async create(file: Express.Multer.File): Promise<TransformData<Media>> {
    try {
      const media = new Media()
      media.file_name = file.filename
      media.mime_type = file.mimetype
      media.name = file.originalname
      media.size = file.size
      media.original_url = `${process.env.HOST}/uploads/${file.filename}`
      const response = await this.mediaRepository.save(media)
      return { data: response }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
  async createWithCloud(file: Express.Multer.File): Promise<TransformData<Media>> {
    try {
      const responseCloud = await this.cloudinaryService.uploadFile(
        file,
        {
          resource_type: 'image',
          folder: 'houston_img'
        }
      )
      const media = new Media()
      media.file_name = responseCloud.name
      media.mime_type = file.mimetype
      media.name = file.originalname
      media.size = file.size
      media.original_url = responseCloud.url
      const response = await this.mediaRepository.save(media)
      return { data: response }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
}
