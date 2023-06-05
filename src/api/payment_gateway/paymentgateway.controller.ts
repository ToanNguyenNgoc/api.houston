/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Response, Request } from "express"
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { QueryVnpay } from "./dto";
import * as moment from "moment";
import { createHmac } from "crypto";
import axios from "axios";

@Controller("payment_gateways")
@ApiTags("payment_gateways")
export class PaymentGatewayController {

  @ApiExcludeEndpoint()
  @Get("callback_url")
  async vnpayCallBackUrl(@Req() req: Request, @Query() query: any, @Res() res: Response) {
    process.env.TZ = 'Asia/Ho_Chi_Minh'
    const date = new Date()
    const vnp_TmnCode = process.env.VN_TMN_CODE;
    const secretKey = process.env.VN_SECRET_KEY;
    const vnp_Api = process.env.VN_PAY_API;

    const vnp_TxnRef = query.vnp_TxnRef;
    const vnp_TransactionDate = query.vnp_PayDate;
    const vnp_RequestId = moment(date).format('HHmmss');
    const vnp_Version = '2.1.0';
    const vnp_Command = 'querydr';
    const vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

    const vnp_IpAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress
    const currCode = 'VND';
    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');
    const data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
    const hmac = createHmac("sha512", secretKey);
    const vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");
    const dataObj = {
      'vnp_RequestId': vnp_RequestId,
      'vnp_Version': vnp_Version,
      'vnp_Command': vnp_Command,
      'vnp_TmnCode': vnp_TmnCode,
      'vnp_TxnRef': vnp_TxnRef,
      'vnp_OrderInfo': vnp_OrderInfo,
      'vnp_TransactionDate': '30230604163103',
      'vnp_CreateDate': vnp_CreateDate,
      'vnp_IpAddr': vnp_IpAddr,
      'vnp_SecureHash': '263ca1b64cc33ad9e087cf81f368a3ed1c6389593be376dc27624fac2eef6fc6b39cebeb579f8b302fb82b402a1a8eab3396a2cf6464ad3794f5aeb3f3e9b5a8'
    };
    const result = await axios.post(vnp_Api, dataObj)
    console.log(result.data)
    const callbackUrl = process.env.VN_PAY_CALLBACK_URL
    return res.redirect(`${callbackUrl}?vnp_TxnRef=${vnp_TxnRef}&vnp_Transaction=${vnp_TransactionDate}`)
  }

  @Get("vnpay_status")
  vnpayStatus(@Res() res: Response, @Query() query: QueryVnpay) {
    return res.json({})
  }
}
