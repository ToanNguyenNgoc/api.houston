import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtSysGuard, RoleGuard } from 'src/middlewares/guards';
import { name } from 'src/common';

@ApiTags('payment_methods')
@Controller('payment_methods')
@UseGuards(JwtSysGuard)
@ApiBearerAuth(name.JWT)
@ApiSecurity('x-api-key')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) { }

  @ApiExcludeEndpoint()
  @Post()
  @UseGuards(RoleGuard)
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodService.update(+id, updatePaymentMethodDto);
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodService.remove(+id);
  }
}
