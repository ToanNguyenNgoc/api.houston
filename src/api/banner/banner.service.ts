import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Banner } from './entities';
import { Media } from '../media/entities';
import { TransformData } from '../../interface';
import { QueryBannerDTO } from './dto';
import { transformResponse } from '../../common';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRe: Repository<Banner>,
    @InjectRepository(Media)
    private readonly mediaRe: Repository<Media>
  ) { }
  async create(body: CreateBannerDto): Promise<TransformData<Banner>> {
    try {
      const media = await this.mediaRe.createQueryBuilder('tb_media').where({ id: body.media_id }).getOne()
      const banner = new Banner()
      banner.name = body.name
      banner.media = media
      banner.type = body.type
      banner.content = body.content
      banner.url = body.url
      banner.original_id = body.original_id
      const response = await this.bannerRe.save(banner)
      return { data: response }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findAll(query: QueryBannerDTO): Promise<TransformData<Banner[]>> {
    try {
      const page = parseInt(`${query.page || 1}`)
      const limit = parseInt(`${query.limit || 15}`)
      const queryBuilder = this.bannerRe
        .createQueryBuilder('tb_banner')
        .where({ status: true, deleted: false })
        .leftJoin('tb_banner.media', 'tb_media')
        .addSelect(['tb_media.original_url'])
        .orderBy('tb_banner.created_at', 'DESC')
      if (query.type) {
        queryBuilder.andWhere(new Brackets(qb => qb.where('tb_banner.type =:type', { type: query.type })))
      }
      const [data, total] = await queryBuilder.offset((page * limit) - limit).limit(limit).getManyAndCount()
      return transformResponse(data, total, page, limit)
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findOne(id): Promise<TransformData<Banner>> {
    try {
      const response = await this.bannerRe
        .createQueryBuilder('tb_banner')
        .where({ status: true, deleted: false, id: id })
        .leftJoin('tb_banner.media', 'tb_media')
        .addSelect(['tb_media.original_url'])
        .getOne()
      if (!response) throw new NotFoundException('Cannot found')
      return { data: response }
    } catch (error) {
      throw new NotFoundException('Cannot found')
    }
  }

  async update(id: string, body: UpdateBannerDto) {
    try {
      const media = body.media_id ? 
      await this.mediaRe.createQueryBuilder('tb_media').where({ id: body.media_id }).getOne():undefined
      const banner = await this.bannerRe.createQueryBuilder('tb_banner')
        .where({ status: true, deleted: false, id: id })
        .leftJoinAndSelect('tb_banner.media', 'tb_media').getOne()
      if (!banner) throw new NotFoundException('Cannot found')
      await this.bannerRe.createQueryBuilder('tb_banner')
        .update(Banner)
        .where({ id: id })
        .set({
          name: body.name,
          media: media,
          type: body.type,
          content: body.content,
          url: body.url,
          original_id: body.original_id,
          status: body.status
        })
        .execute()
      return {
        data: {
          ...banner,
          ...body,
          media: { original_url: body.media_id ? media.original_url : banner.media?.original_url }
        }
      }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async remove(id: string) {
    try {
      await this.bannerRe.createQueryBuilder('tb_banner')
        .update(Banner)
        .where({ id: id, deleted: false, status: true })
        .set({ deleted: true })
        .execute()
      return { message: 'Delete success' };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
}
