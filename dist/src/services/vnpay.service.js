"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnpayService = void 0;
const moment = require("moment");
const querystring = require("qs");
const crypto_1 = require("crypto");
const utils_1 = require("../utils");
const sortObject = (obj) => {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
        sorted[key] = obj[key];
    }
    return sorted;
};
class VnpayService {
    createPaymentGateway({ req, amount, bankCode }) {
        const createDate = moment().format('YYYYMMDDHHmmss');
        const ipAddr = '::1';
        const tmnCode = process.env.VN_TMN_CODE;
        const secretKey = process.env.VN_SECRET_KEY;
        let vnpUrl = process.env.VN_CREATE_PAY_URL;
        const returnUrl = process.env.VN_RETURN_URL;
        const orderId = (0, utils_1.encode)(`${moment().format('DDHHmmss')}-${moment().milliseconds()}`);
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
        const hmac = (0, crypto_1.createHmac)('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
        const callbackUrl = process.env.VN_PAY_CALLBACK_URL;
        return {
            transaction: createDate,
            txn_ref: orderId,
            payment_url: vnpUrl,
            callback_url: `${callbackUrl}?txn_ref=${orderId}`,
            secure_hash: signed
        };
    }
}
exports.VnpayService = VnpayService;
//# sourceMappingURL=vnpay.service.js.map