import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto, QrFoodDTO, UpdateFoodDto } from './dto'
import { Account } from 'src/api/account/entities';
import { InjectRepository, } from '@nestjs/typeorm';
import { Branch } from 'src/api/branches/entities';
import { Brackets, Like, Repository } from 'typeorm';
import { FoodCate } from 'src/api/food_cate/entities';
import { Media } from 'src/api/media/entities';
import { Food } from 'src/api/food/entities';
import { TransformData } from 'src/interface';
import { convertBoolean } from 'src/utils';
import { transformResponse } from 'src/common';

@Injectable()
export class FoodService {

  constructor(
    @InjectRepository(Branch)
    private readonly branchRep: Repository<Branch>,
    @InjectRepository(FoodCate)
    private readonly foodCateRep: Repository<FoodCate>,
    @InjectRepository(Media)
    private readonly mediaRep: Repository<Media>,
    @InjectRepository(Food)
    private readonly foodRep: Repository<Food>
  ) { }

  async create(user: Account, body: CreateFoodDto): Promise<TransformData<Food>> {
    try {
      const branch = await this.branchRep.createQueryBuilder('tb_branch')
        .where({ id: user.branch?.id }).getOne()
      if (!branch) throw new NotFoundException('Cannot found branch')
      const foodCate = await this.foodCateRep.createQueryBuilder('tb_food_cate')
        .where({ id: body.food_cate })
        .leftJoin('tb_food_cate.branch', 'tb_branch').addSelect(['tb_branch.id'])
        .getOne()
      if (!foodCate) throw new NotFoundException('Cannot found food category')
      if (foodCate.branch?.id !== branch.id) {
        throw new ForbiddenException('You cannot use food category other branch')
      }
      const media = await this.mediaRep.createQueryBuilder('tb_media')
        .where({ id: body.media }).getOne()
      const food = new Food()
      food.name = body.name,
        food.description = body.description,
        food.media = media,
        food.branch = branch,
        food.food_cate = foodCate
      const response = await this.foodRep.save(food)
      return { data: response };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findAll(qr: QrFoodDTO): Promise<TransformData<Food[]>> {
    try {
      const page = parseInt(`${qr.page ?? 1}`)
      const limit = parseInt(`${qr.limit ?? 15}`)
      const status = convertBoolean(qr.status)
      const qb = this.foodRep.createQueryBuilder('tb_food').where({ deleted: false })
        .leftJoin('tb_food.media', 'tb_media').addSelect(['tb_media.original_url'])
        .leftJoin('tb_food.branch', 'tb_branch')
        .addSelect(['tb_branch.id','tb_branch.name'])
        .leftJoinAndSelect('tb_food.food_cate', 'tb_food_cate')
      if (qr.search) {
        qb.andWhere(
          new Brackets((q) => q
            .where({ name: Like(`%${qr.search}%`) })
            .orWhere({ description: Like(`%${qr.search}%`) })
          )
        )
      }
      if (qr.branch_id) {
        qb.andWhere(
          new Brackets((q) => q.where('tb_branch.id =:branch_id', { branch_id: qr.branch_id }))
        )
      }
      if (qr.food_cate_id) {
        qb.andWhere(
          new Brackets((q) => q.where('tb_food_cate.id =:food_cate_id', { food_cate_id: qr.food_cate_id }))
        )
      }
      if (qr.status) {
        qb.andWhere(
          new Brackets((q) => q.where('tb_food.status =:status', { status: status }))
        )
      }

      qb.orderBy('tb_food.created_at', 'DESC')
      const [response, total] = await qb.skip((page * limit) - limit).limit(limit).getManyAndCount()
      return transformResponse(response, total, page, limit);
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findOne(id: string): Promise<TransformData<Food>> {
    try {
      const response = await this.foodRep.createQueryBuilder('tb_food')
        .where({ deleted: false, id: id })
        .leftJoin('tb_food.media', 'tb_media').addSelect(['tb_media.original_url'])
        .leftJoinAndSelect('tb_food.branch', 'tb_branch')
        .leftJoinAndSelect('tb_food.food_cate', 'tb_food_cate')
        .getOne()
      if (!response) throw new NotFoundException('Cannot found')
      return { data: response };
    } catch (error) {
      throw new NotFoundException('Cannot found')
    }
  }

  async update(id: string, body: UpdateFoodDto) {
    await this.foodRep.createQueryBuilder('tb_food')
      .where({ id: id, deleted: false })
      .update(Food)
      .set({
        name: body.name,
        description: body.description,
        food_cate: body.description ?
          await this.foodCateRep.createQueryBuilder('tb_food_cate').where({ id: body.food_cate_id }).getOne()
          :
          undefined,
        media: body.media ?
          await this.mediaRep.createQueryBuilder('tb_media').where({ id: body.media }).getOne()
          :
          undefined,
        status: body.status
      })
      .execute()
    return { message: 'Update success' };
  }

  async remove(id: string) {
    try {
      await this.foodRep.createQueryBuilder('tb_food')
        .where({ id: id })
        .update(Food)
        .set({ deleted: true })
        .execute()
      return { message: 'Delete success' };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
}
