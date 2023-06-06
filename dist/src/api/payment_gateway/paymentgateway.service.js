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
exports.PaymentGatewayService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const typeorm_2 = require("typeorm");
const moment = require("moment");
const crypto_1 = require("crypto");
const axios_1 = require("axios");
const entities_2 = require("../booking/entities");
let PaymentGatewayService = class PaymentGatewayService {
    constructor(bookingRe, paymentGatewayRe) {
        this.bookingRe = bookingRe;
        this.paymentGatewayRe = paymentGatewayRe;
    }
    async updateStatus(req, query, res) {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        const callbackUrl = process.env.VN_PAY_CALLBACK_URL;
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
            'vnp_TransactionDate': vnp_TransactionDate,
            'vnp_CreateDate': vnp_CreateDate,
            'vnp_IpAddr': vnp_IpAddr,
            'vnp_SecureHash': vnp_SecureHash
        };
        const qb = this.paymentGatewayRe.createQueryBuilder('tb_payment_gateway')
            .update(entities_1.PaymentGateway)
            .where({ txn_ref: vnp_TxnRef });
        const result = await axios_1.default.post(vnp_Api, dataObj);
        if (result.data.vnp_TransactionStatus === "00") {
            await qb.set({ status: 'SUCCESS' }).execute();
        }
        else {
            await qb.set({ status: 'CANCEL' }).execute();
        }
        return res.redirect(`${callbackUrl}?txn_ref=${vnp_TxnRef}`);
    }
    async status(req, qr) {
        const qb = this.bookingRe.createQueryBuilder('tb_booking')
            .leftJoinAndSelect('tb_booking.payment_gateway', 'tb_payment_gateway')
            .where('tb_payment_gateway.txn_ref =:txn_ref', { txn_ref: qr.txn_ref })
            .leftJoin('tb_booking.customer', 'tb_customer')
            .addSelect(['tb_customer.id', 'tb_customer.fullname'])
            .andWhere(new typeorm_2.Brackets((qb) => qb.where('tb_customer.id =:id', { id: req.user.id })))
            .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
            .leftJoinAndSelect('tb_booking.villa', 'tb_villa')
            .leftJoinAndSelect('tb_branch.province', 'tb_province')
            .leftJoinAndSelect('tb_branch.district', 'tb_district')
            .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
            .leftJoinAndSelect('tb_villa.thumbnail', 'tb_media')
            .leftJoinAndSelect('tb_booking.payment_method', 'tb_payment_method');
        const response = await qb.getOne();
        if (!response)
            throw new common_1.NotFoundException("Cannot found");
        return { data: response };
    }
};
PaymentGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_2.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.PaymentGateway)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentGatewayService);
exports.PaymentGatewayService = PaymentGatewayService;
//# sourceMappingURL=paymentgateway.service.js.map