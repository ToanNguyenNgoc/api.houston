import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CompanyContactService } from './company_contact.service';
import { CreateCompanyContactDto } from './dto/create-company_contact.dto';
import { UpdateCompanyContactDto } from './dto/update-company_contact.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiSecurity('x-api-key')
@ApiTags('company_contacts')
@Controller('company_contacts')
export class CompanyContactController {
  constructor(private readonly companyContactService: CompanyContactService) {}

  @Post()
  create(@Body() createCompanyContactDto: CreateCompanyContactDto) {
    return this.companyContactService.create(createCompanyContactDto);
  }

  @Get()
  findAll() {
    return this.companyContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyContactService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyContactDto: UpdateCompanyContactDto) {
    return this.companyContactService.update(+id, updateCompanyContactDto);
  }
}
