import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities';
import { District, Province, Ward } from '../province/entities';
import { Media } from '../media/entities';
import { Villa } from '../villa/entities';
import { VillaGallery } from '../villa_gallery/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Branch, Media, Province, District, Ward, Villa, VillaGallery])
  ],
  controllers: [BranchesController],
  providers: [
    BranchesService
  ]
})
export class BranchesModule { }
