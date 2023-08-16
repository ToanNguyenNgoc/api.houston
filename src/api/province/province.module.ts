import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { DistrictController, MapAddressController, ProvinceController } from './province.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District, Province, Ward } from './entities';
import { RedisCacheModule, RedisCacheService } from 'src/redis';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward]), RedisCacheModule],
  controllers: [
    ProvinceController,
    DistrictController,
    MapAddressController
  ],
  providers: [ProvinceService, RedisCacheService]
})
export class ProvinceModule { }
