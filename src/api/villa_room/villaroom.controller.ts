/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateRoomDTO, QueryRoomDTO, UpdateRoomDTO } from './dto'
import { VillaRoomService } from './villaroom.service'
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { name } from '../../common';

@ApiTags('villa_rooms')
@Controller('villa_rooms')
@ApiSecurity(name.API_KEY)
export class VillaRoomController {

  constructor(
    private readonly villaRoomService: VillaRoomService
  ) { }

  @UseGuards(JwtSysGuard, RoleGuard)
  @Post()
  create(@Body() body: CreateRoomDTO) {
    return this.villaRoomService.create(body)
  }

  @Get()
  findAll(@Query() qr: QueryRoomDTO) {
    return this.villaRoomService.findAll(qr)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.villaRoomService.findOne(id)
  }

  @UseGuards(JwtSysGuard, RoleGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateRoomDTO) {
    return this.villaRoomService.update(id, body)
  }

  @UseGuards(JwtSysGuard, RoleGuard)
  @Delete(':id')
  deleted(@Param('id') id: string) {
    return this.villaRoomService.delete(id)
  }
}
