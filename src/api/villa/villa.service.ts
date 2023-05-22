import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVillaDto } from './dto/create-villa.dto';
import { UpdateVillaDto } from './dto/update-villa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VillaCate } from '../villa_cate/entities';
import { Brackets, Like, Repository } from 'typeorm';
import { Villa } from './entities';
import { Media } from '../media/entities';
import { QueryByIdVillaDTO, QueryVillaDTO } from './dto';

import { Branch } from '../branches/entities';
import { Booking } from '../booking/entities';
import { RequestHeader, TransformData } from '../../interface';
import { Account } from '../account/entities';
import { convertBoolean, isSPAdmin } from '../../utils';
import { transformResponse } from '../../common';

@Injectable()
export class VillaService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRe: Repository<Branch>,
    @InjectRepository(VillaCate)
    private readonly villaCateRe: Repository<VillaCate>,
    @InjectRepository(Villa)
    private readonly villaRe: Repository<Villa>,
    @InjectRepository(Media)
    private readonly mediaRe: Repository<Media>,
  ) { }
  async create(req: RequestHeader<Account>, body: CreateVillaDto): Promise<TransformData<Villa>> {
    if (body.special_price && body.price <= body.special_price) {
      throw new BadRequestException('Special price is always smaller than price')
    }
    const branch = await this.branchRe
      .createQueryBuilder('tb_branch')
      .where({
        id: isSPAdmin(req.user) ? body.branch_id : req.user.branch.id,
        status: true
      })
      .getOne()
    if (!branch) throw new NotFoundException('Cannot found villa branch')
    const villaCate = await this.villaCateRe
      .createQueryBuilder('tb_villa_cate')
      .where({ id: body.villa_cate_id, status: true })
      .getOne()
    if (!villaCate) throw new NotFoundException('Cannot found villa category')
    const media = await this.mediaRe
      .createQueryBuilder('tb_media')
      .where({ id: body.media_id })
      .getOne()
    const villa = new Villa()
    villa.name = body.name
    villa.description = body.description
    villa.thumbnail = media
    villa.branch = branch
    villa.villa_cate = villaCate
    villa.price = body.price
    villa.special_price = body.special_price ?? body.price
    villa.acreage = body.acreage
    villa.holiday_price = body.holiday_price
    villa.weekend_price = body.weekend_price
    const response = await this.villaRe.save(villa)
    return { data: response }
  }

  async findAll(query: QueryVillaDTO): Promise<TransformData<Villa[]>> {
    const page = parseInt(`${query.page ?? 1}`)
    const limit = parseInt(`${query.limit ?? 15}`)
    const status = convertBoolean(query.status)
    const min_price = query.min_price ?? 0
    const max_price = query.max_price ?? 10000000000
    const joins = query.includes?.split('|') ?? []
    let orderByPrice
    if (query.sort_price === "-price") orderByPrice = "DESC"
    if (query.sort_price === "price") orderByPrice = "ASC"
    const queryBuilder = this.villaRe
      .createQueryBuilder('tb_villa')
      .where({ deleted: false })
      .andWhere(
        new Brackets((qb) => qb.where(
          query.status ? { status: status } : {}
        ))
      )
      .leftJoin('tb_villa.thumbnail', 'tb_media')
      .addSelect(['tb_media.original_url'])
      .leftJoinAndSelect('tb_villa.villa_cate', 'tb_villa_cate')
      .leftJoinAndSelect('tb_villa.branch', 'tb_branch')
      .andWhere(
        new Brackets((qb) => {
          qb.where({ name: Like(`%${query.search ?? ''}%`) })
        })
      )
      .andWhere(
        new Brackets((qb) => qb.where(
          query.branch_id ? 'tb_branch.id =:branch_id' : '',
          query.branch_id ? { branch_id: query.branch_id } : {}
        ))
      )
      .andWhere(
        new Brackets((qb) => qb.where(
          query.villa_cate_id ? 'tb_villa_cate.id =:villa_cate_id' : '',
          query.villa_cate_id ? { villa_cate_id: query.villa_cate_id } : {}
        ))
      )
      .andWhere(
        min_price && max_price ?
          'tb_villa.special_price BETWEEN :min_price AND :max_price' :
          min_price ? 'tb_villa.special_price >= :min_price' :
            max_price ? 'tb_villa.special_price <= :max_price' :
              ''
        , {
          min_price: min_price,
          max_price: max_price
        }
      )
      .orderBy(
        orderByPrice ? 'tb_villa_special_price' : 'tb_villa.created_at',
        orderByPrice ? orderByPrice : 'DESC'
      )
      .offset((page * limit) - limit)
      .limit(limit)
    if (joins.includes('full_address')) {
      queryBuilder
        .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
        .leftJoinAndSelect('tb_branch.district', 'tb_district')
        .leftJoinAndSelect('tb_branch.province', 'tb_province')
    }
    // queryBuilder
    //   .leftJoinAndSelect('tb_villa.bookings', 'tb_booking')
    //   .andWhere(
    //     new Brackets((qb) => qb.where('tb_booking.status_booking =:status_booking', { status_booking: 'PENDING' }))
    //   )
    const response = await queryBuilder.getManyAndCount()
    return transformResponse(response[0], response[1], page, limit);
  }

  async findOne(id: string, query: QueryByIdVillaDTO): Promise<TransformData<Villa>> {
    const joins = query.includes?.split('|') ?? []
    const queryBuilder = this.villaRe
      .createQueryBuilder('tb_villa')
      .where({ id: id })
      .leftJoin('tb_villa.thumbnail', 'tb_media')
      .addSelect(['tb_media.original_url'])
    if (joins.includes('category')) {
      queryBuilder
        .leftJoinAndSelect('tb_villa.villa_cate', 'tb_villa_cate')
    }
    if (joins.includes('branch')) {
      queryBuilder
        .leftJoinAndSelect('tb_villa.branch', 'tb_branch')
    }
    if (joins.includes('full_address')) {
      queryBuilder
        .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
        .leftJoinAndSelect('tb_branch.district', 'tb_district')
        .leftJoinAndSelect('tb_branch.province', 'tb_province')
    }
    if (!await queryBuilder.getOne()) {
      throw new NotFoundException('Cannot found')
    }
    return { data: await queryBuilder.getOne() }
  }

  async update(id: string, req: RequestHeader<Account>, body: UpdateVillaDto) {
    try {
      const response = await this.villaRe
        .createQueryBuilder('tb_villa')
        .where({ id: id, deleted: false })
        .getOne()
      if (!response) throw new NotFoundException('Cannot found villa')

      if (body.price && body.special_price && body.special_price > body.price) {
        throw new BadRequestException('Special price is always smaller than price')
      }
      if (!body.price && body.special_price > response.price) {
        throw new BadRequestException('Special price is always smaller than price')
      }

      await this.villaRe.createQueryBuilder('tb_villa')
        .where({ id: id })
        .update(Villa)
        .set({
          branch: isSPAdmin(req.user) ? await this.branchRe
            .createQueryBuilder('tb_branch')
            .where({ id: body.branch_id, deleted: false })
            .getOne()
            :
            undefined,
          name: body.name,
          villa_cate: body.villa_cate_id ? await this.villaCateRe
            .createQueryBuilder('tb_villa_cate')
            .where({ id: body.villa_cate_id, deleted: false })
            .getOne()
            :
            undefined,
          thumbnail: body.media_id ? await this.mediaRe
            .createQueryBuilder('tb_media')
            .where({ id: body.media_id })
            .getOne()
            :
            undefined,
          description: body.description,
          price: body.price,
          special_price: body.special_price,
          holiday_price: body.holiday_price,
          weekend_price: body.weekend_price,
          acreage: body.acreage,
          status: body.status
        })
        .execute()
      return { message: 'Update success !' };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async remove(id: string) {
    try {
      await this.villaRe.createQueryBuilder('tb_villa')
        .where({ id: id })
        .update(Villa)
        .set({ deleted: true })
        .execute()
      return { message: 'Delete success !' };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
}
