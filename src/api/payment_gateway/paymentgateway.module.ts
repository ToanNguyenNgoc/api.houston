import { PaymentGatewayController } from './paymentgateway.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        PaymentGatewayController,],
    providers: [],
})
export class PaymentGatewayModule { }
