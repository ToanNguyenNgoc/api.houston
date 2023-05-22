import { Module } from '@nestjs/common';
import { AuthCustomerService } from './auth-customer.service';
import { AuthCustomerController } from './auth-customer.controller';
import { Customer } from '../customer/entities'
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { OtpEntity } from '../otp/entities'
import { SendMailService } from '../../services';
import { Media } from '../media/entities'
import { RefreshToken } from '../refresh_token/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, OtpEntity, Media, RefreshToken]),
    JwtModule
  ],
  controllers: [AuthCustomerController],
  providers: [AuthCustomerService, SendMailService]
})
export class AuthCustomerModule { }
