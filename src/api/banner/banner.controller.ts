import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { BannerService } from './banner.service';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { name } from '../../common';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { CreateBannerDto, QueryBannerDTO, UpdateBannerDto } from './dto';

@ApiTags('banners')
@Controller('banners')
@ApiSecurity('x-api-key')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }

  @ApiBearerAuth(name.JWT)
  @UseGuards(JwtSysGuard, RoleGuard)
  @Post()
  create(@Body() body: CreateBannerDto) {
    return this.bannerService.create(body);
  }

  @Get()
  findAll(@Query() query: QueryBannerDTO) {
    return this.bannerService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  @ApiBearerAuth(name.JWT)
  @UseGuards(JwtSysGuard, RoleGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @ApiBearerAuth(name.JWT)
  @UseGuards(JwtSysGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
