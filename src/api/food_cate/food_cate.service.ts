import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodCateDto } from './dto/create-food_cate.dto';
import { UpdateFoodCateDto } from './dto/update-food_cate.dto';
import { Account } from 'src/api/account/entities';
import { Branch } from 'src/api/branches/entities';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodCate } from 'src/api/food_cate/entities';
import { QrCateFoodDTO } from 'src/api/food_cate/dto';
import { TransformData } from 'src/interface';
import { transformResponse } from 'src/common';
import { convertBoolean } from 'src/utils';

@Injectable()
export class FoodCateService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRep: Repository<Branch>,
    @InjectRepository(FoodCate)
    private readonly foodCateRep: Repository<FoodCate>
  ) { }
  async create(user: Account, body: CreateFoodCateDto) {
    try {
      const branch = await this.branchRep.createQueryBuilder('tb_branch')
        .where({ id: user.branch?.id }).getOne()
      if (!branch) throw new NotFoundException('Not found branch')
      const foodCate = new FoodCate()
      foodCate.name = body.name
      foodCate.description = body.description
      foodCate.branch = branch
      const response = await this.foodCateRep.save(foodCate)
      return { data: response }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findAll(qr: QrCateFoodDTO): Promise<TransformData<FoodCate[]>> {
    try {
      const page = parseInt(`${qr.page ?? 1}`)
      const limit = parseInt(`${qr.limit ?? 15}`)
      const status = convertBoolean(qr.status)
      const qb = this.foodCateRep.createQueryBuilder('tb_food_cate')
        .where({ deleted: false })
        .leftJoin('tb_food_cate.branch', 'tb_branch')
        .addSelect(['tb_branch.id', 'tb_branch.name'])
        .leftJoin('tb_branch.image', 'tb_media').addSelect(['tb_media.original_url'])
      if (qr.branch_id) {
        qb.andWhere(
          new Brackets((q) => q.where('tb_branch.id =:branch_id', { branch_id: qr.branch_id }))
        )
      }
      if (qr.status) {
        qb.andWhere(
          new Brackets((q) => q.where('tb_food_cate.status =:status', { status: status }))
        )
      }
      const [response, total] = await qb
        .orderBy('tb_food_cate.created_at', 'DESC')
        .skip((page * limit) - limit).limit(limit).getManyAndCount()
      return transformResponse(response, total, page, limit);
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findOne(id: string): Promise<TransformData<FoodCate>> {
    try {
      const response = await this.foodCateRep.createQueryBuilder('tb_food_cate')
        .where({ id: id, deleted: false })
        .leftJoinAndSelect('tb_food_cate.branch', 'tb_branch')
        .leftJoin('tb_branch.image', 'tb_media')
        .addSelect(['tb_media.id','tb_media.original_url'])
        .getOne()
      if (!response) throw new NotFoundException('Cannot found')
      return { data: response }
    } catch (error) {
      throw new NotFoundException('Cannot found')
      // throw new BadRequestException(`${error}`)
    }
  }

  async update(id: string, body: UpdateFoodCateDto) {
    try {
      await this.foodCateRep.createQueryBuilder('tb_food_cate')
        .where({ id: id, deleted: false })
        .update(FoodCate)
        .set({
          name: body.name,
          description: body.description,
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
      await this.foodCateRep.createQueryBuilder('tb_food_cate')
        .where({ id: id, deleted: false })
        .update(FoodCate)
        .set({ deleted: true })
        .execute()
      return { message: 'Delete success' };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
}
