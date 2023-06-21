import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { FoodCateService } from './food_cate.service';
import { CreateFoodCateDto } from './dto/create-food_cate.dto';
import { UpdateFoodCateDto } from './dto/update-food_cate.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtSysGuard, RoleGuard } from 'src/middlewares/guards';
import { RequestHeader } from 'src/interface';
import { Account } from 'src/api/account/entities';
import { name } from 'src/common';
import { QrCateFoodDTO } from 'src/api/food_cate/dto';
import { FoodCateGuard } from './food_cate.guard'

@ApiSecurity('x-api-key')
@ApiTags('food_cates')
@Controller('food_cates')
export class FoodCateController {
  constructor(private readonly foodCateService: FoodCateService) { }

  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  @Post()
  create(@Req() req: RequestHeader<Account>, @Body() body: CreateFoodCateDto) {
    return this.foodCateService.create(req.user, body);
  }

  @Get()
  findAll(@Query() qr: QrCateFoodDTO) {
    return this.foodCateService.findAll(qr);
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.foodCateService.findOne(id);
  }

  @UseGuards(JwtSysGuard, RoleGuard, FoodCateGuard)
  @ApiBearerAuth(name.JWT)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateFoodCateDto) {
    return this.foodCateService.update(id, body);
  }

  @UseGuards(JwtSysGuard, RoleGuard, FoodCateGuard)
  @ApiBearerAuth(name.JWT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodCateService.remove(id);
  }
}
