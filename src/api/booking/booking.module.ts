import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  BookingController,
  BookingCustomerController
} from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities';
import { Customer } from '../customer/entities';
import { Account } from '../account/entities';
import { Villa } from '../villa/entities';
import { Branch } from '../branches/entities';
import { SendMailService, VnpayService } from '../../services';
import { PaymentMethod } from 'src/api/payment_method/entities';
import { PaymentGateway } from 'src/api/payment_gateway/entities';

@Module({
  imports: [TypeOrmModule.forFeature([
    Branch,
    Booking,
    Customer,
    Account,
    Villa,
    PaymentMethod,
    PaymentGateway
  ])],
  controllers: [
    BookingController,
    BookingCustomerController
  ],
  providers: [BookingService, SendMailService, VnpayService]
})
export class BookingModule { }
