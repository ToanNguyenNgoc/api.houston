/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { VillaRoomService } from './villaroom.service';
import { VillaRoomController } from './villaroom.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { VillaRoom } from './entities'
import { Villa } from '../villa/entities';
import { Media } from '../media/entities';

@Module({
    imports: [TypeOrmModule.forFeature([VillaRoom, Villa, Media])],
    controllers: [VillaRoomController],
    providers: [VillaRoomService],
})
export class VillaRoomModule { }
