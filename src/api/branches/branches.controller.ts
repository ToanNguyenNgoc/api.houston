import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { QueryBranchDTO } from './dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchGuard } from './branch.guard';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { name } from '../../common';

@Controller('branches')
@ApiSecurity('x-api-key')
@ApiTags('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) { }

  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get()
  findAll(@Query() query: QueryBranchDTO) {
    return this.branchesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(+id);
  }
  @UseGuards(JwtSysGuard, RoleGuard, BranchGuard)
  @ApiBearerAuth(name.JWT)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(id, updateBranchDto);
  }
  @UseGuards(JwtSysGuard, RoleGuard, BranchGuard)
  @ApiBearerAuth(name.JWT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchesService.remove(id);
  }

  @Get(':id/galleries')
  findGalleriesById(@Param('id') id:string){
    return this.branchesService.findGalleriesById(id)
  }
}
