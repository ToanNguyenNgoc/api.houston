import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingCustomerDto, CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Account } from '../account/entities';
import { Customer } from '../customer/entities';
import { QueryBooking, QueryBookingCustomer } from './dto';
import { BookingGuard } from './booking.guard';
import { name } from '../../common';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { RequestHeader } from '../../interface';
import { Recaptcha } from '@nestlab/google-recaptcha';

@ApiTags('bookings & bookings customer')
@Controller('bookings')
@ApiSecurity('x-api-key')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @ApiBearerAuth(name.JWT)
  @UseGuards(JwtSysGuard, RoleGuard)
  @Post()
  create(@Req() req: RequestHeader<Account>, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(req, createBookingDto);
  }

  @ApiBearerAuth(name.JWT)
  @UseGuards(JwtSysGuard, RoleGuard)
  @Get()
  findAll(@Req() req: RequestHeader<Account>, @Query() query: QueryBooking) {
    return this.bookingService.findAll(req, query);
  }

  @ApiBearerAuth(name.JWT)
  @UseGuards(JwtSysGuard, RoleGuard)
  @Get(':id')
  findOne(@Req() req: RequestHeader<Account>, @Param('id') id: string) {
    return this.bookingService.findOne(req, id);
  }

  @ApiBearerAuth(name.JWT)
  @UseGuards(JwtSysGuard, RoleGuard, BookingGuard)
  @Put(':id')
  update(@Req() req: RequestHeader<Account>, @Param('id') id: string, @Body() body: UpdateBookingDto) {
    return this.bookingService.update(req, id, body);
  }

  @ApiBearerAuth(name.JWT)
  @UseGuards(JwtSysGuard, RoleGuard, BookingGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
@ApiTags('bookings & bookings customer')
@Controller('bookings_customer')
@ApiSecurity('x-api-key')
@UseGuards(JwtSysGuard)
@ApiBearerAuth(name.JWT)
// @UseGuards(JwtCookieGuard)
export class BookingCustomerController {
  constructor(
    private readonly bookingService: BookingService
  ) { }
  // @Recaptcha({ response: req => req.body.recaptcha, action: 'BOOKING_CUSTOMER', score: 0.8 })
  @Post('')
  create(@Req() req: RequestHeader<Customer>, @Body() body: CreateBookingCustomerDto) {
    return this.bookingService.createByCustomer(req, body)
  }
  @Get('')
  findAll(@Req() req: RequestHeader<Customer>, @Query() query: QueryBookingCustomer) {
    return this.bookingService.findAllByCustomer(req, query)
  }
  @Get(':id')
  findOne(@Req() req: RequestHeader<Customer>, @Param('id') id: string) {
    return this.bookingService.findOneByCustomer(req, id)
  }
}

