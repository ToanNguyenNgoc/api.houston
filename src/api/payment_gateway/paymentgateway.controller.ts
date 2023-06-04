/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import {Response} from "express"
import { ApiTags } from '@nestjs/swagger';
import { QueryVnpay } from "./dto";

@Controller()
@ApiTags("payment_gateways")
export class PaymentGatewayController {
  @Get("vnpay_status")
  vnpayStatus(@Res() res:Response, @Query() query: QueryVnpay) {
    console.log(query)
    return res.redirect("https://houstongarden.click")
  }
}
