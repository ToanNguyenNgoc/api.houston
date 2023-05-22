import { Module } from '@nestjs/common';
import { VillaService } from './villa.service';
import { VillaController } from './villa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VillaCate } from '../villa_cate/entities';
import { Villa } from './entities';
import { Media } from '../media/entities';
import { VillaGallery } from '../villa_gallery/entities';
import { Branch } from '../branches/entities';
import { Booking } from '../booking/entities';

@Module({
  imports: [TypeOrmModule.forFeature([
    VillaCate,
    Villa,
    VillaGallery,
    Media,
    Branch,
    Booking
  ])],
  controllers: [VillaController],
  providers: [VillaService]
})
export class VillaModule { }
