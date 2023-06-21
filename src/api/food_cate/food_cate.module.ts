import { Module } from '@nestjs/common';
import { FoodCateService } from './food_cate.service';
import { FoodCateController } from './food_cate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodCate } from 'src/api/food_cate/entities';
import { Branch } from 'src/api/branches/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, FoodCate])],
  controllers: [FoodCateController],
  providers: [FoodCateService]
})
export class FoodCateModule { }
