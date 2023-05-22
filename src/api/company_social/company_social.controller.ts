import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CompanySocialService } from './company_social.service';
import { CreateCompanySocialDto } from './dto/create-company_social.dto';
import { UpdateCompanySocialDto } from './dto/update-company_social.dto';

@ApiSecurity('x-api-key')
@ApiTags('company_socials')
@Controller('company_socials')
export class CompanySocialController {
  constructor(private readonly companySocialService: CompanySocialService) {}

  @Post()
  create(@Body() createCompanySocialDto: CreateCompanySocialDto) {
    return this.companySocialService.create(createCompanySocialDto);
  }

  @Get()
  findAll() {
    return this.companySocialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companySocialService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanySocialDto: UpdateCompanySocialDto) {
    return this.companySocialService.update(+id, updateCompanySocialDto);
  }
}
