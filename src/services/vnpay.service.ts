import { Customer } from "src/api/customer/entities"
import { RequestHeader } from "src/interface"
import * as moment from "moment"
import * as querystring from "qs"
import { createHmac } from "crypto"
import { encode } from "src/utils"

interface ICreatePayment {
  req: RequestHeader<Customer>,
  amount: number,
  bankCode: "VNPAYQR" | "VNBANK" | "INTCARD" | any
}

const sortObject = (obj: Record<string, any>): Record<string, any> => {
  const sorted: Record<string, any> = {};
  const keys = Object.keys(obj).sort();

  for (const key of keys) {
    sorted[key] = obj[key];
  }

  return sorted;
};

export class VnpayService {
  createPaymentGateway({
    req, amount, bankCode
  }: ICreatePayment) {

    const createDate = moment().format('YYYYMMDDHHmmss');
    const ipAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress
    const tmnCode = process.env.VN_TMN_CODE;
    const secretKey = process.env.VN_SECRET_KEY
    let vnpUrl = process.env.VN_CREATE_PAY_URL
    const returnUrl = process.env.VN_RETURN_URL
    const orderId = encode(`${moment().format('DDHHmmss')}-${moment().milliseconds()}`);
    const locale = 'vn';
    const currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = process.env.VN_PAY_VERSION;
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = bankCode;
    vnp_Params = sortObject(vnp_Params);
    const signData = querystring.stringify(vnp_Params, { encode: true });
    const hmac = createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
    const callbackUrl = process.env.VN_PAY_CALLBACK_URL
    return {
      transaction: createDate,
      txn_ref: orderId,
      payment_url: vnpUrl,
      callback_url: `${callbackUrl}?txn_ref=${orderId}`,
      secure_hash: signed
    }
  }
}