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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../branches/entities");
const typeorm_2 = require("typeorm");
const entities_2 = require("../villa/entities");
const entities_3 = require("../customer/entities");
const entities_4 = require("../account/entities");
const entities_5 = require("./entities");
const moment = require("moment");
const services_1 = require("../../services");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
const entities_6 = require("../payment_method/entities");
const entities_7 = require("../payment_gateway/entities");
let BookingService = class BookingService {
    constructor(branchRe, villaRe, customerRe, accountRe, bookingRe, paymentMethodRe, paymentGatewayRe, sendMail, vnpayService) {
        this.branchRe = branchRe;
        this.villaRe = villaRe;
        this.customerRe = customerRe;
        this.accountRe = accountRe;
        this.bookingRe = bookingRe;
        this.paymentMethodRe = paymentMethodRe;
        this.paymentGatewayRe = paymentGatewayRe;
        this.sendMail = sendMail;
        this.vnpayService = vnpayService;
    }
    async create(req, body) {
        var _a, _b;
        try {
            const user = req.user;
            const nights = (0, utils_1.rangeDate)(body.from_date_booking, body.to_date_booking);
            if (nights < 0)
                throw new common_1.BadRequestException('Date to is invalid');
            const account = req.user;
            const branch = await this.branchRe.createQueryBuilder('tb_branch')
                .where({ id: (0, utils_1.isSPAdmin)(user) ? body.branch_id : (_a = user.branch) === null || _a === void 0 ? void 0 : _a.id, deleted: false }).getOne();
            if (!branch)
                throw new common_1.NotFoundException('Cannot found branch');
            const villa = await this.villaRe.createQueryBuilder('tb_villa')
                .where({ id: body.villa_id, deleted: false }).getOne();
            if (!villa)
                throw new common_1.NotFoundException('Cannot found villa');
            const customer = await this.customerRe.createQueryBuilder('tb_customer')
                .where({ id: body.customer_id, deleted: false }).getOne();
            if (!customer)
                throw new common_1.NotFoundException('Cannot found customer');
            const payment_method = await this.paymentMethodRe.createQueryBuilder('tb_payment_method')
                .where({ name_key: common_2.payKey.CASH }).getOne();
            if (!payment_method)
                throw new common_1.NotFoundException('Cannot found payment method');
            const booking = new entities_5.Booking();
            booking.branch = branch;
            booking.villa = villa;
            booking.customer = customer;
            booking.employee = account;
            booking.from_date_booking = body.from_date_booking;
            booking.to_date_booking = body.to_date_booking;
            booking.nights = nights;
            booking.customer_count = body.customer_count;
            booking.baby_count = (_b = body.baby_count) !== null && _b !== void 0 ? _b : 0;
            booking.note = body.note;
            booking.amount = nights * villa.special_price;
            booking.payment_method = payment_method;
            const response = await this.bookingRe.save(booking);
            delete response.customer.password;
            delete response.employee.password;
            return { data: response };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findAll(req, query) {
        var _a, _b, _c, _d, _e;
        const page = parseInt(`${(_a = query.page) !== null && _a !== void 0 ? _a : 1}`);
        const limit = parseInt(`${(_b = query.limit) !== null && _b !== void 0 ? _b : 15}`);
        const _isSPAdmin = (0, utils_1.isSPAdmin)(req.user);
        const joins = (_e = (_d = (_c = query.includes) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.split('|')) !== null && _e !== void 0 ? _e : [];
        const qb = this.bookingRe.createQueryBuilder('tb_booking')
            .where({ deleted: false })
            .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
            .leftJoinAndSelect('tb_booking.villa', 'tb_villa')
            .leftJoin('tb_booking.customer', 'tb_customer')
            .addSelect(['tb_customer.id', 'tb_customer.email', 'tb_customer.fullname', 'tb_customer.telephone']);
        if (query.status_booking) {
            qb.andWhere(new typeorm_2.Brackets((qb) => qb.where('tb_booking.status_booking =:status_booking', { status_booking: query.status_booking })));
        }
        if (!_isSPAdmin) {
            qb.andWhere(new typeorm_2.Brackets((qb) => qb.where('tb_branch.id =:id', { id: req.user.branch.id })));
        }
        if (_isSPAdmin && query.branch_id) {
            qb.andWhere(new typeorm_2.Brackets((qb) => qb.where('tb_branch.id =:id', { id: query.branch_id })));
        }
        if (query.booking_platform) {
            qb.andWhere(new typeorm_2.Brackets((qb) => qb.where('tb_booking.booking_platform =:booking_platform', { booking_platform: query.booking_platform })));
        }
        if (query.filter_customer) {
            qb.andWhere(new typeorm_2.Brackets((qb) => qb.where('tb_customer.fullname LIKE :fullname', { fullname: (`%${query.filter_customer}%`) })
                .orWhere('tb_customer.email LIKE :email', { email: `%${query.filter_customer}%` })
                .orWhere('tb_customer.telephone LIKE :telephone', { telephone: query.filter_customer })));
        }
        if (joins.includes('full_address')) {
            qb.leftJoinAndSelect('tb_branch.province', 'tb_province')
                .leftJoinAndSelect('tb_branch.district', 'tb_district')
                .leftJoinAndSelect('tb_branch.ward', 'tb_ward');
        }
        if (joins.includes('villa_media')) {
            qb.leftJoinAndSelect('tb_villa.thumbnail', 'tb_media');
        }
        qb.leftJoinAndSelect('tb_booking.payment_method', 'tb_payment_method');
        const response = await qb
            .offset((page * limit) - limit)
            .limit(limit)
            .getManyAndCount();
        return (0, common_2.transformResponse)(response[0], response[1], page, limit);
    }
    async findOne(req, id) {
        const queryBuilder = this.bookingRe.createQueryBuilder('tb_booking')
            .where({ id: id, deleted: false })
            .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
            .leftJoinAndSelect('tb_booking.villa', 'tb_villa')
            .leftJoin('tb_booking.customer', 'tb_customer')
            .addSelect(['tb_customer.id', 'tb_customer.email', 'tb_customer.telephone', 'tb_customer.fullname'])
            .leftJoin('tb_customer.avatar', 'tb_media')
            .addSelect(['tb_media.original_url']);
        if (!(0, utils_1.isSPAdmin)(req.user)) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => { var _a; return qb.where('tb_branch.id =:id', { id: (_a = req.user.branch) === null || _a === void 0 ? void 0 : _a.id }); }));
        }
        const response = await queryBuilder.getOne();
        if (!response)
            throw new common_1.NotFoundException('Cannot found');
        return { data: response };
    }
    async update(req, id, body) {
        await this.bookingRe.createQueryBuilder('tb_booking')
            .update(entities_5.Booking)
            .where({ id: id })
            .set({
            status_booking: body.booking_status,
            note: body.note,
            employee_update: req.user
        })
            .execute();
        return { status: 'Update booking success !' };
    }
    async remove(id) {
        await this.bookingRe.createQueryBuilder('tb_booking')
            .update(entities_5.Booking)
            .where({ id: id })
            .set({ deleted: true })
            .execute();
        return { data: 'Delete booking success !' };
    }
    async createByCustomer(req, body) {
        var _a;
        try {
            const customer = await this.customerRe.createQueryBuilder('tb_customer')
                .where({ id: req.user.id, email: req.user.email })
                .getOne();
            const nights = (0, utils_1.rangeDate)(body.from_date_booking, body.to_date_booking);
            if (nights < 0)
                throw new common_1.BadRequestException('Date to is invalid');
            if (!customer)
                throw new common_1.UnauthorizedException();
            const branch = await this.branchRe.createQueryBuilder('tb_branch')
                .where({ id: body.branch_id, deleted: false }).getOne();
            if (!branch)
                throw new common_1.NotFoundException('Cannot found branch');
            const villa = await this.villaRe.createQueryBuilder('tb_villa')
                .where({ id: body.villa_id, deleted: false }).getOne();
            if (!villa)
                throw new common_1.NotFoundException('Cannot found villa');
            const payment_method = await this.paymentMethodRe.createQueryBuilder('tb_payment_method')
                .where({ name_key: body.payment_method }).getOne();
            if (!payment_method)
                throw new common_1.NotFoundException("Cannot found payment method");
            const booking = new entities_5.Booking();
            booking.customer = customer;
            booking.branch = branch;
            booking.villa = villa;
            booking.from_date_booking = body.from_date_booking;
            booking.to_date_booking = body.to_date_booking;
            booking.nights = nights;
            booking.customer_count = body.customer_count;
            booking.baby_count = (_a = body.baby_count) !== null && _a !== void 0 ? _a : 0;
            booking.note = body.note;
            booking.amount = nights * villa.special_price;
            booking.booking_platform = 'WEB_CLIENT';
            booking.payment_method = payment_method;
            if (payment_method.name_key === common_2.payKey.CASH) {
                const response = await this.bookingRe.save(booking);
                delete response.customer.password;
                await this.sendMail.onSendMail({
                    to: customer.email,
                    subject: 'Houston - Confirm Booking ✔',
                    template: 'booking_confirm',
                    context: {
                        data: {
                            customer: customer,
                            villa: villa,
                            villa_price: (0, utils_1.formatPrice)(villa.special_price),
                            date_from: moment(response.from_date_booking).format('DD/MM/YYYY'),
                            date_to: moment(response.to_date_booking).format('DD/MM/YYYY'),
                            nights: nights,
                            customer_count: `Bao gồm ${response.customer_count + response.baby_count} người 
            (${response.customer_count} người lớn ${response.baby_count > 0 ? ` & ${response.baby_count} trẻ em` : ''})`,
                            amount: (0, utils_1.formatPrice)(response.amount)
                        }
                    }
                });
                return { data: response };
            }
            if (payment_method.name_key === common_2.payKey.VNPAY) {
                if (!await this.paymentMethodRe.createQueryBuilder('tb_payment_method')
                    .where({ name_key: body.payment_method, name_children_key: body.payment_method_bank })
                    .getOne())
                    throw new common_1.NotFoundException('Cannot found method bank');
                const result = this.vnpayService.createPaymentGateway({
                    req, amount: nights * villa.special_price, bankCode: body.payment_method_bank
                });
                const gateway = new entities_7.PaymentGateway();
                gateway.amount = nights * villa.special_price;
                gateway.description = `Thanh toán cho thuê villa ${villa.name}`;
                gateway.transaction = result.transaction;
                gateway.txn_ref = result.txn_ref;
                gateway.payment_url = result.payment_url;
                gateway.callback_url = result.callback_url;
                gateway.secure_hash = result.secure_hash;
                const resGateway = await this.paymentGatewayRe.save(gateway);
                booking.payment_gateway = resGateway;
                const response = await this.bookingRe.save(booking);
                delete response.customer.password;
                return { data: response };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findAllByCustomer(req, query) {
        var _a, _b, _c, _d, _e;
        const page = parseInt(`${(_a = query.page) !== null && _a !== void 0 ? _a : 1}`);
        const limit = parseInt(`${(_b = query.limit) !== null && _b !== void 0 ? _b : 15}`);
        const joins = (_e = (_d = (_c = query.includes) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.split('|')) !== null && _e !== void 0 ? _e : [];
        const user = req.user;
        const queryBuilder = this.bookingRe.createQueryBuilder('tb_booking')
            .where({ deleted: false })
            .leftJoin('tb_booking.customer', 'tb_customer')
            .leftJoinAndSelect('tb_booking.payment_gateway', 'tb_payment_gateway')
            .leftJoinAndSelect('tb_booking.payment_method', 'tb_payment_method')
            .addSelect(['tb_customer.id', 'tb_customer.fullname'])
            .andWhere(new typeorm_2.Brackets((qb) => qb.where('tb_customer.id =:id', { id: user.id })));
        queryBuilder
            .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
            .leftJoinAndSelect('tb_booking.villa', 'tb_villa');
        if (query.status_booking) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => qb.where('tb_booking.status_booking =:status_booking', { status_booking: query.status_booking })));
        }
        if (joins.includes('full_address')) {
            queryBuilder.leftJoinAndSelect('tb_branch.province', 'tb_province')
                .leftJoinAndSelect('tb_branch.district', 'tb_district')
                .leftJoinAndSelect('tb_branch.ward', 'tb_ward');
        }
        if (joins.includes('villa_media')) {
            queryBuilder.leftJoinAndSelect('tb_villa.thumbnail', 'tb_media');
        }
        const [data, total] = await queryBuilder
            .orderBy('tb_booking.created_at', "DESC")
            .offset((page * limit) - limit)
            .limit(limit)
            .getManyAndCount();
        return (0, common_2.transformResponse)(data, total, page, limit);
    }
    async findOneByCustomer(req, id) {
        const queryBuilder = this.bookingRe.createQueryBuilder('tb_booking')
            .where({ deleted: false, id: id })
            .leftJoinAndSelect('tb_booking.payment_gateway', 'tb_payment_gateway')
            .orWhere(new typeorm_2.Brackets((qb) => qb.orWhere('tb_payment_gateway.txn_ref =:txn_ref', { txn_ref: id })))
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
        const response = await queryBuilder.getOne();
        if (!response)
            throw new common_1.NotFoundException('Cannot found');
        return { data: response };
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Branch)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.Villa)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_3.Customer)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_4.Account)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_5.Booking)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_6.PaymentMethod)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_7.PaymentGateway)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        services_1.SendMailService,
        services_1.VnpayService])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map