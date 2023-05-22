import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { name } from '../../common';

@ApiSecurity('x-api-key')
@Controller('permissions')
@ApiTags('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  findAll() {
    return this.permissionService.findAll();
  }

  // @Get(':id')
  // @UseGuards(JwtSysGuard, RoleGuard)
  // findOne(@Param('id') id: string) {
  //   return this.permissionService.findOne(+id);
  // }
}
