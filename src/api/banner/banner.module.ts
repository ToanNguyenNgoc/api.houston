import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities';
import { Media } from '../media/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Media])],
  controllers: [BannerController],
  providers: [BannerService]
})
export class BannerModule { }
