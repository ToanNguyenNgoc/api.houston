import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from 'src/api/branches/entities';
import { FoodCate } from 'src/api/food_cate/entities';
import { Food } from 'src/api/food/entities';
import { Media } from 'src/api/media/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, FoodCate, Food, Media])],
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule { }
