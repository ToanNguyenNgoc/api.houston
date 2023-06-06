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
exports.PaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("./entities");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_2 = require("../../common");
let PaymentMethodService = class PaymentMethodService {
    constructor(paymentMethodRep) {
        this.paymentMethodRep = paymentMethodRep;
    }
    async create(body) {
        try {
            const qb = this.paymentMethodRep
                .createQueryBuilder('tb_payment_method')
                .insert()
                .into(entities_1.PaymentMethod)
                .values([
                { name: 'Thanh toán bằng tiền mặt', name_key: 'CASH', name_children_key: 'CASH' },
                { name: 'Thanh toán qua VNPAY', name_key: 'VNPAY', name_children: 'Thanh toán qua ứng dụng hỗ trợ VNPAYQR', name_children_key: 'VNPAYQR' },
                { name: 'Thanh toán qua VNPAY', name_key: 'VNPAY', name_children: 'Thanh toán qua ATM-Tài khoản ngân hàng nội địa', name_children_key: 'VNBANK' },
                { name: 'Thanh toán qua VNPAY', name_key: 'VNPAY', name_children: 'Thanh toán qua thẻ quốc tế', name_children_key: 'INTCARD' },
            ]);
            const response = await qb.execute();
            return { data: response };
        }
        catch (error) {
            return { message: 'Create success' };
        }
    }
    async findAll() {
        try {
            const qb = this.paymentMethodRep
                .createQueryBuilder('tb_payment_method')
                .where({ deleted: false })
                .orderBy('tb_payment_method.created_at', 'DESC')
                .skip((15 * 1) - 15)
                .limit(15);
            const [response, total] = await qb.getManyAndCount();
            return (0, common_2.transformResponse)(response, total, 1, 15);
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findOne(id) {
        const qb = this.paymentMethodRep
            .createQueryBuilder('tb_payment_method')
            .where({ id: id, deleted: false });
        const response = await qb.getOne();
        if (!response)
            throw new common_1.NotFoundException('Cannot found');
        return { data: response };
    }
    update(id, updatePaymentMethodDto) {
        return `This action updates a #${id} paymentMethod`;
    }
    remove(id) {
        return `This action removes a #${id} paymentMethod`;
    }
};
PaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.PaymentMethod)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PaymentMethodService);
exports.PaymentMethodService = PaymentMethodService;
//# sourceMappingURL=payment_method.service.js.map