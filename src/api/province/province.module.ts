import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { DistrictController, MapAddressController, ProvinceController } from './province.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District, Province, Ward } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [
    ProvinceController,
    DistrictController,
    MapAddressController
  ],
  providers: [ProvinceService]
})
export class ProvinceModule { }
