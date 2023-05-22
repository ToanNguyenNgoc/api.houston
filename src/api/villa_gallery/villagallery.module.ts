/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { VillaGalleryController } from './villagallery.controller';
import { VillaGalleryService } from './villagallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VillaGallery } from './entities';
import { Villa } from '../villa/entities';
import { Media } from '../media/entities';

@Module({
    imports: [TypeOrmModule.forFeature([VillaGallery, Villa, Media])],
    controllers: [VillaGalleryController],
    providers: [VillaGalleryService],
})
export class VillaGalleryModule { }
