"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGatewayController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const moment = require("moment");
const crypto_1 = require("crypto");
const axios_1 = require("axios");
let PaymentGatewayController = class PaymentGatewayController {
    async vnpayCallBackUrl(req, query, res) {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        const date = new Date();
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
            req.socket.remoteAddress;
        const currCode = 'VND';
        const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');
        const data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
        const hmac = (0, crypto_1.createHmac)("sha512", secretKey);
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
        const result = await axios_1.default.post(vnp_Api, dataObj);
        console.log(result.data);
        const callbackUrl = process.env.VN_PAY_CALLBACK_URL;
        return res.redirect(`${callbackUrl}?vnp_TxnRef=${vnp_TxnRef}&vnp_Transaction=${vnp_TransactionDate}`);
    }
    vnpayStatus(res, query) {
        return res.json({});
    }
};
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)("callback_url"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentGatewayController.prototype, "vnpayCallBackUrl", null);
__decorate([
    (0, common_1.Get)("vnpay_status"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.QueryVnpay]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "vnpayStatus", null);
PaymentGatewayController = __decorate([
    (0, common_1.Controller)("payment_gateways"),
    (0, swagger_1.ApiTags)("payment_gateways")
], PaymentGatewayController);
exports.PaymentGatewayController = PaymentGatewayController;
//# sourceMappingURL=paymentgateway.controller.js.map