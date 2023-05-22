import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { VillaCateService } from './villa_cate.service';
import { CreateVillaCateDto } from './dto/create-villa_cate.dto';
import { UpdateVillaCateDto } from './dto/update-villa_cate.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { QueryVillaCateDTO } from './dto';
import { VillaCateGuard } from './villa_cate.guard';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { name } from '../../common';

@ApiSecurity(name.API_KEY)
@ApiTags('villa_cates')
@Controller('villa_cates')
export class VillaCateController {
  constructor(private readonly villaCateService: VillaCateService) { }

  @Post()
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  create(@Body() createVillaCateDto: CreateVillaCateDto) {
    return this.villaCateService.create(createVillaCateDto);
  }

  @Get()
  findAll(@Query() query: QueryVillaCateDTO) {
    return this.villaCateService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.villaCateService.findOne(id);
  }
  @UseGuards(JwtSysGuard, RoleGuard, VillaCateGuard)
  @ApiBearerAuth(name.JWT)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateVillaCateDto: UpdateVillaCateDto) {
    return this.villaCateService.update(id, updateVillaCateDto);
  }
  @UseGuards(JwtSysGuard, RoleGuard, VillaCateGuard)
  @ApiBearerAuth(name.JWT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.villaCateService.remove(id);
  }
}
