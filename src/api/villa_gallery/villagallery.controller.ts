/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { VillaGalleryService } from './villagallery.service';
import { CreateVillaGalleryDTO, QueryVillaGalleryDTO } from './dto';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { name } from '../../common';

@ApiSecurity(name.API_KEY)
@ApiTags('villa_galleries')
@Controller('villa_galleries')
export class VillaGalleryController {
  constructor(
    private readonly villaGalleryService: VillaGalleryService
  ) { }
  @Post()
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  create(@Body() body: CreateVillaGalleryDTO) {
    return this.villaGalleryService.create(body)
  }
  @Get()
  findAll(@Query() query: QueryVillaGalleryDTO) {
    return this.villaGalleryService.findAll(query)
  }
}
