import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { PaymentMethodController } from './payment_method.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from "./entities"

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService]
})
export class PaymentMethodModule { }
