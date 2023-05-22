/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Villa } from '../villa/entities';
import { Repository } from 'typeorm';
import { VillaGallery } from './entities';
import { Media } from '../media/entities';
import { CreateVillaGalleryDTO, QueryVillaGalleryDTO, UpdateVillaGalleryDTO } from './dto';
import { Promise } from 'bluebird';
import { TransformData } from '../../interface';
import { transformResponse } from '../../common';

@Injectable()
export class VillaGalleryService {
  constructor(
    @InjectRepository(Villa)
    private readonly villaRe: Repository<Villa>,
    @InjectRepository(VillaGallery)
    private readonly villaGalleryRe: Repository<VillaGallery>,
    @InjectRepository(Media)
    private readonly mediaRe: Repository<Media>
  ) { }
  async create(body: CreateVillaGalleryDTO) {
    const villa = await this.villaRe
      .createQueryBuilder('tb_villa')
      .where({ id: body.villa_id, deleted: false })
      .getOne()
    if (!villa) throw new NotFoundException(`Cannot found villa with id: ${body.villa_id}`)
    const medias = await Promise.map(body.media_ids, async (media_id) => {
      const media = await this.mediaRe.createQueryBuilder('tb_media').where({ id: media_id }).getOne()
      return media
    }).filter(Boolean)
    const values = medias.map(item => {
      return {
        villa: villa,
        image: item
      }
    })
    try {
      await this.villaGalleryRe.createQueryBuilder('tb_villa_gallery')
        .insert()
        .into(VillaGallery)
        .values(values)
        .execute()
      return { data: values }
    } catch (error) {
      const oldMedias = await this.villaGalleryRe
        .createQueryBuilder('tb_villa_gallery')
        .where({ villa: body.villa_id })
        .getMany()
      const oldMediasId = oldMedias.map(i => i.id)
      await this.villaGalleryRe.createQueryBuilder('tb_villa_gallery')
        .delete()
        .from(VillaGallery)
        .where('id In(:id)', {
          id: oldMediasId,
        })
        .execute();
      await this.villaGalleryRe.createQueryBuilder('tb_villa_gallery')
        .insert()
        .into(VillaGallery)
        .values(values)
        .execute()
      return { data: values }
    }
  }
  async findAll(query: QueryVillaGalleryDTO): Promise<TransformData<VillaGallery[]>> {
    const page = parseInt(`${query.page ?? 1}`)
    const limit = parseInt(`${query.limit ?? 15}`)
    const response = await this.villaGalleryRe
      .createQueryBuilder('tb_villa_gallery')
      .where({ villa: query.villa_id })
      .leftJoinAndSelect('tb_villa_gallery.image', 'tb_media')
      .offset((page * limit) - limit)
      .limit(limit)
      .getManyAndCount()
    return transformResponse(response[0], response[1], page, limit)
  }
  async update(id: string, body: UpdateVillaGalleryDTO) {
    return
  }
}
