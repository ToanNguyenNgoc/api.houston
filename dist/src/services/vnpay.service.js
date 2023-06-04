"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnpayService = void 0;
const moment = require("moment");
const querystring = require("qs");
const crypto_1 = require("crypto");
const sortObject = (obj) => {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
        sorted[key] = obj[key];
    }
    return sorted;
};
class VnpayService {
    async createPaymentGateway({ req }) {
        const createDate = moment().format('YYYYMMDDHHmmss');
        const ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress;
        const tmnCode = "8HRDW3ZS";
        const secretKey = "DXKMSENFLYVYMGLYQIUZPKVDTHCHLBSQ";
        let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        const returnUrl = "http://localhost:3003/vnpay_status?vnp_TxnRef=1&vnp_TransactionDate=1";
        const orderId = moment().format('DDHHmmss');
        const amount = 10000;
        const bankCode = 'VNBANK';
        const locale = 'vn';
        const currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
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
        console.log(vnpUrl);
        return signData;
    }
}
exports.VnpayService = VnpayService;
//# sourceMappingURL=vnpay.service.js.map