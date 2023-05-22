import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CreateRoleDTO, QueryRoleDTO, UpdateRoleDTO } from './dto';
import { RoleService } from './role.service';
import { Request } from 'express'
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards'
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { name } from '../../common';

@ApiSecurity('x-api-key')
@Controller('roles')
@ApiTags('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  findAll(@Query() query:QueryRoleDTO) {
    return this.roleService.fillAll(query)
  }
  @Get(':id')
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  findOne(
    @Param('id') id: number,
  ) {
    return this.roleService.findOne(id)
  }
  @Post()
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  create(@Body() body: CreateRoleDTO) {
    return this.roleService.create(body)
  }

  @Put(':id')
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  update(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() body: UpdateRoleDTO
  ) {
    return this.roleService.update(id, body)
  }

}
