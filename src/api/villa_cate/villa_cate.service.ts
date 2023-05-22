import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVillaCateDto } from './dto/create-villa_cate.dto';
import { UpdateVillaCateDto } from './dto/update-villa_cate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VillaCate } from './entities';
import { Brackets, Like, Repository } from 'typeorm';
import { Branch } from '../branches/entities';
import { Media } from '../media/entities';
import { TransformData } from '../../interface';
import { QueryVillaCateDTO } from './dto';
import { convertBoolean } from '../../utils';
import { transformResponse } from '../../common';
@Injectable()
export class VillaCateService {
  constructor(
    @InjectRepository(VillaCate)
    private readonly villaCateRe: Repository<VillaCate>,
    @InjectRepository(Branch)
    private readonly branchRe: Repository<Branch>,
    @InjectRepository(Media)
    private readonly mediaRe: Repository<Media>,
  ) { }
  async create(body: CreateVillaCateDto): Promise<TransformData<VillaCate>> {
    try {
      const branch = await this.branchRe
        .createQueryBuilder('tb_branch')
        .where({ id: body.branch_id, status: true }).getOne()
      if (!branch) throw new NotFoundException('Cannot found branch')
      const media = await this.mediaRe
        .createQueryBuilder('tb_media')
        .where({ id: body.media_id })
        .getOne()
      const villaCate = new VillaCate()
      villaCate.villa_cate_name = body.villa_cate_name
      villaCate.description = body.description
      villaCate.branch = branch
      villaCate.villa_cate_image = media
      const response = await this.villaCateRe.save(villaCate)
      return { data: response };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findAll(query: QueryVillaCateDTO): Promise<TransformData<VillaCate[]>> {
    const page = parseInt(`${query.page ?? 1}`)
    const limit = parseInt(`${query.limit ?? 15}`)
    const status = convertBoolean(query.status)
    const branch_id = query.branch_id
    const response = await this.villaCateRe
      .createQueryBuilder('tb_villa_cate')
      .where({ deleted: false })
      .leftJoin('tb_villa_cate.villa_cate_image', 'tb_media')
      .addSelect(['tb_media.original_url'])
      .leftJoinAndSelect('tb_villa_cate.branch', 'tb_branch')
      .andWhere(
        new Brackets((qb) => qb.where(
          branch_id ? 'tb_branch.id =:id' : '',
          branch_id ? { id: branch_id } : {}
        ))
      )
      .andWhere(
        new Brackets((qb) => qb.where(query.status ? { status: status } : {}))
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where({ villa_cate_name: Like(`%${query.search ?? ''}%`) })
        }),
      )
      .orderBy('tb_villa_cate.created_at','DESC')
      .skip((page * limit) - limit)
      .limit(limit)
      .getManyAndCount()

    return transformResponse(response[0], response[1], page, limit);
  }

  async findOne(id: string): Promise<TransformData<VillaCate>> {
    const response = await this.villaCateRe
      .createQueryBuilder('tb_villa_cate')
      .where({ id: id })
      .leftJoin('tb_villa_cate.villa_cate_image', 'tb_media')
      .addSelect(['tb_media.original_url'])
      .leftJoinAndSelect('tb_villa_cate.branch', 'tb_branch')
      .getOne()
    if (!response) throw new NotFoundException('Cannot found')
    return { data: response };
  }

  async update(id: string, body: UpdateVillaCateDto) {
    try {
      const responseBranch = await this.branchRe.
        createQueryBuilder('tb_branch').
        where({ id: body.branch_id, deleted: false })
        .getOne()
      const image = await this.mediaRe.
        createQueryBuilder('tb_media').
        where({ id: body.media_id })
        .getOne()
      await this.branchRe
        .createQueryBuilder('tb_villa_cate')
        .update(VillaCate)
        .where({ id: id })
        .set({
          villa_cate_name: body.villa_cate_name,
          description: body.description,
          villa_cate_image: image ? image : undefined,
          branch: responseBranch ? responseBranch : undefined,
          status: body.status
        })
        .execute()
      return { message: 'Update success' };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async remove(id: string) {
    try {
      await this.villaCateRe
        .createQueryBuilder('tb_villa_cate')
        .where({ id: id })
        .update(VillaCate)
        .set({ deleted: true })
        .execute()
      return { message: 'Deleted success' };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
}
