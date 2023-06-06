/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from "express"
import { ApiTags, ApiExcludeEndpoint, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { QueryVnpay } from "./dto";
import { PaymentGatewayService } from "./paymentgateway.service"
import { RequestHeader } from 'src/interface';
import { Customer } from 'src/api/customer/entities';
import { name } from 'src/common';
import { JwtSysGuard } from 'src/middlewares/guards';

@Controller("payment_gateways")
@ApiTags("payment_gateways")
export class PaymentGatewayController {

  constructor(
    private readonly paymentGatewayService: PaymentGatewayService
  ) { }

  @ApiExcludeEndpoint()
  @Get("callback_url")
  async vnpayCallBackUrl(@Req() req: Request, @Query() query: any, @Res() res: Response) {
    return this.paymentGatewayService.updateStatus(req, query, res)
  }

  @Get("status")
  @UseGuards(JwtSysGuard)
  @ApiBearerAuth(name.JWT)
  @ApiSecurity('x-api-key')
  status(@Req() req: RequestHeader<Customer>, @Query() query: QueryVnpay) {
    return this.paymentGatewayService.status(req, query)
  }
}
