import { Module } from '@nestjs/common';
import { VillaCateService } from './villa_cate.service';
import { VillaCateController } from './villa_cate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VillaCate } from './entities';
import { Branch } from '../branches/entities';
import { Media } from '../media/entities';

@Module({
  imports:[TypeOrmModule.forFeature([
    VillaCate,
    Branch,
    Media
  ])],
  controllers: [VillaCateController],
  providers: [VillaCateService]
})
export class VillaCateModule {}
