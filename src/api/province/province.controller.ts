import { Controller, Get, Param, Query, } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { name } from '../../common';
import { QueryMapDTO } from './dto';

@ApiSecurity(name.API_KEY)
@ApiTags('provinces & map places')
@Controller('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) { }
  @Get()
  findAll() {
    return this.provinceService.findAll();
  }
  @Get(':province_code/districts')
  findDistricts(@Param('province_code') province_code: string) {
    return this.provinceService.findDistrictsByProvince(province_code);
  }
  // @Get('districts/:district_code/wards')
  // findWards(
  //   @Param('district_code') district_code: string
  // ) {
  //   return this.provinceService.findWards(district_code)
  // }
}
@ApiTags('provinces & map places')
@Controller('districts')
export class DistrictController {
  constructor(private readonly provinceService: ProvinceService) { }
  @Get(':district_code/wards')
  findWards(
    @Param('district_code') district_code: string
  ) {
    return this.provinceService.findWards(district_code)
  }
}
@ApiTags('provinces & map places')
@Controller('map_address')
export class MapAddressController {
  constructor(private readonly provinceService: ProvinceService) { }
  @Get('places')
  getPlaces(@Query() query:QueryMapDTO) {
    return this.provinceService.getPlaces(query)
  }
}
