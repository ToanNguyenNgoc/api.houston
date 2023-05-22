import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CustomerOriginalService } from './customer_original.service';
import { CreateCustomerOriginalDto } from './dto/create-customer_original.dto';
import { UpdateCustomerOriginalDto } from './dto/update-customer_original.dto';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards'

@ApiSecurity('x-api-key')
@ApiTags('customer_originals')
@Controller('customer_originals')
export class CustomerOriginalController {
  constructor(private readonly customerOriginalService: CustomerOriginalService) { }

  @Post()
  @UseGuards(JwtSysGuard, RoleGuard)
  create(@Body() createCustomerOriginalDto: CreateCustomerOriginalDto) {
    return this.customerOriginalService.create(createCustomerOriginalDto);
  }

  @Get()
  // @UseGuards(JwtSysGuard, RoleGuard)
  findAll() {
    return this.customerOriginalService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtSysGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.customerOriginalService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtSysGuard, RoleGuard)
  update(@Param('id') id: string, @Body() updateCustomerOriginalDto: UpdateCustomerOriginalDto) {
    return this.customerOriginalService.update(+id, updateCustomerOriginalDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerOriginalService.remove(+id);
  // }
}
