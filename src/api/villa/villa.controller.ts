import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Req } from '@nestjs/common';
import { VillaService } from './villa.service';
import { CreateVillaDto } from './dto/create-villa.dto';
import { UpdateVillaDto } from './dto/update-villa.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { QueryByIdVillaDTO, QueryVillaDTO } from './dto';
import { VillaGuard } from './villa.guard';
import { name } from '../../common';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { RequestHeader } from '../../interface';
import { Account } from '../account/entities';

@ApiSecurity(name.API_KEY)
@ApiTags('villas')
@Controller('villas')
export class VillaController {
  constructor(private readonly villaService: VillaService) { }

  @Post()
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  create(@Req() req:RequestHeader<Account>, @Body() createVillaDto: CreateVillaDto) {
    return this.villaService.create(req,createVillaDto);
  }

  @Get()
  findAll(@Query() query: QueryVillaDTO) {
    return this.villaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: QueryByIdVillaDTO) {
    return this.villaService.findOne(id, query);
  }
  @UseGuards(JwtSysGuard, RoleGuard, VillaGuard)
  @ApiBearerAuth(name.JWT)
  @Put(':id')
  update(@Req() req:RequestHeader<Account>,  @Param('id') id: string, @Body() updateVillaDto: UpdateVillaDto) {
    return this.villaService.update(id,req, updateVillaDto);
  }
  @UseGuards(JwtSysGuard, RoleGuard, VillaGuard)
  @ApiBearerAuth(name.JWT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.villaService.remove(id);
  }
}
