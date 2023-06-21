import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto, QrFoodDTO, UpdateFoodDto } from './dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtSysGuard, RoleGuard } from 'src/middlewares/guards';
import { name } from 'src/common';
import { RequestHeader } from 'src/interface';
import { Account } from 'src/api/account/entities';
import { FoodGuard } from './food.guard'

@ApiSecurity('x-api-key')
@ApiTags('foods')
@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }

  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  @Post()
  create(@Req() req: RequestHeader<Account>, @Body() body: CreateFoodDto) {
    return this.foodService.create(req.user, body);
  }

  @Get()
  findAll(@Query() qr: QrFoodDTO) {
    return this.foodService.findAll(qr);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @UseGuards(JwtSysGuard, RoleGuard, FoodGuard)
  @ApiBearerAuth(name.JWT)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateFoodDto) {
    return this.foodService.update(id, body);
  }

  @UseGuards(JwtSysGuard, RoleGuard, FoodGuard)
  @ApiBearerAuth(name.JWT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(id);
  }
}
