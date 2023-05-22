/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { VillaRoom } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../media/entities';
import { Villa } from '../villa/entities';
import { CreateRoomDTO, QueryRoomDTO, UpdateRoomDTO } from './dto';
import { TransformData } from '../../interface';
import { convertBoolean } from '../../utils';
import { transformResponse } from '../../common';
@Injectable()
export class VillaRoomService {
  constructor(
    @InjectRepository(VillaRoom)
    private readonly roomRe: Repository<VillaRoom>,
    @InjectRepository(Media)
    private readonly mediaRe: Repository<Media>,
    @InjectRepository(Villa)
    private readonly villaRe: Repository<Villa>
  ) { }
  async create(body: CreateRoomDTO) {
    const villa = await this.villaRe.createQueryBuilder('tb_villa')
      .where({ id: body.villa_id, deleted: false })
      .getOne()
    if (!villa) throw new NotFoundException('Cannot found villa')
    const room = new VillaRoom()
    room.name = body.name
    room.description = body.description
    room.thumbnail = body.media_id ? await this.mediaRe
      .createQueryBuilder('tb_media')
      .where({ id: body.media_id }).getOne() : null
    room.villa = villa
    const response = await this.roomRe.save(room)
    return { data: response }
  }

  async findAll(qr: QueryRoomDTO): Promise<TransformData<VillaRoom[]>> {
    try {
      const page = parseInt(`${qr.page || 1}`)
      const limit = parseInt(`${qr.limit || 15}`)
      const status = convertBoolean(qr.status)
      const qb = this.roomRe
        .createQueryBuilder('tb_villa_room')
        .leftJoin('tb_villa_room.villa', 'tb_villa')
        .addSelect(['tb_villa.id', 'tb_villa.name'])
        .leftJoin('tb_villa_room.thumbnail', 'tb_media')
        .addSelect(['tb_media.original_url'])
        .where({ deleted: false, villa: qr.villa_id })
        .andWhere(new Brackets(qb => qb.where(qr.status ? { status: status } : {})))
        .skip((page * limit) - limit)
        .limit(limit)
      const [response, total] = await qb.getManyAndCount()
      return transformResponse(response, total, page, limit)
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findOne(id: string): Promise<TransformData<VillaRoom>> {
    try {
      const qb = this.roomRe
        .createQueryBuilder('tb_villa_room')
        .leftJoin('tb_villa_room.villa', 'tb_villa')
        .addSelect(['tb_villa.id', 'tb_villa.name'])
        .leftJoin('tb_villa_room.thumbnail', 'tb_media')
        .addSelect(['tb_media.original_url'])
        .where({ deleted: false, id: id })
      const response = await qb.getOne()
      if (!response) throw new NotFoundException('Cannot found')
      return { data: response }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async update(id: string, body: UpdateRoomDTO) {
    try {
      const villa = await this.villaRe
        .createQueryBuilder('tb_villa')
        .where({ id: body.villa_id, deleted: false })
        .getOne()
      await this.villaRe.createQueryBuilder('tb_villa_room')
        .where({ id: id, deleted: false })
        .update(VillaRoom)
        .set({
          name: body.name,
          description: body.description,
          thumbnail: body.media_id ? await this.mediaRe
            .createQueryBuilder('tb_media')
            .where({ id: body.media_id })
            .getOne() : undefined,
          villa: villa ? villa : undefined,
          status: body.status
        })
        .execute()
      return { message: 'Update success' }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async delete(id: string) {
    await this.roomRe.createQueryBuilder('tb_villa_room')
      .where({ id: id })
      .update(VillaRoom)
      .set({ deleted: true })
      .execute()
    return { message: 'Deleted success' }
  }
}
