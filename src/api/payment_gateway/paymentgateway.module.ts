import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGatewayController } from './paymentgateway.controller';
import { PaymentGateway } from './entities'
import {PaymentGatewayService} from './paymentgateway.service'
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Booking } from 'src/api/booking/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Booking, PaymentGateway])],
    controllers: [
        PaymentGatewayController,],
    providers: [PaymentGatewayService],
})
export class PaymentGatewayModule { }
