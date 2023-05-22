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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const utils_1 = require("../../utils");
const entities_1 = require("../media/entities");
const entities_2 = require("../customer_original/entities");
const common_2 = require("../../common");
let CustomerService = class CustomerService {
    constructor(customerRepository, mediaRe, CustomerOriginalRe) {
        this.customerRepository = customerRepository;
        this.mediaRe = mediaRe;
        this.CustomerOriginalRe = CustomerOriginalRe;
    }
    async create(body) {
        try {
            if (body.dob && !(0, utils_1.isDateDobFormat)(body.dob)) {
                throw new common_1.BadRequestException('Date is must be format YYYY-MM-DD');
            }
            if (await this.customerRepository
                .createQueryBuilder('tb_customer')
                .where({ email: body.email })
                .getOne()) {
                throw new common_1.BadRequestException('`Email belong to another account`');
            }
            if (await this.customerRepository
                .createQueryBuilder('tb_customer')
                .where({ telephone: body.telephone })
                .getOne()) {
                throw new common_1.BadRequestException('`Telephone belong to another account`');
            }
            if (await this.customerRepository
                .createQueryBuilder('tb_customer')
                .where({ ccid: body.ccid })
                .getOne()) {
                throw new common_1.BadRequestException('`Ccid belong to another account`');
            }
            const avatar = await this.mediaRe
                .createQueryBuilder('tb_media')
                .where({ id: body.media_id })
                .getOne();
            const original = await this.CustomerOriginalRe
                .createQueryBuilder('tb_customer_original')
                .where({ id: body.customerOriginalId })
                .getOne();
            const customer = new customer_entity_1.Customer();
            customer.fullname = body.fullname;
            customer.telephone = body.telephone;
            customer.sex = body.sex;
            customer.full_address = body.full_address;
            customer.country = body.country;
            customer.email = body.email;
            customer.password = body.password ? await (0, utils_1.generatePassword)(body.password) : null;
            customer.dob = body.dob;
            customer.ccid = body.ccid;
            customer.job = body.job;
            customer.avatar = avatar;
            customer.customer_original = original;
            customer.email_transfer = body.email;
            const response = await this.customerRepository.save(customer);
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error.message}`);
        }
    }
    async findAll(query) {
        var _a, _b, _c;
        const page = parseInt(`${(_a = query.page) !== null && _a !== void 0 ? _a : 1}`);
        const limit = parseInt(`${(_b = query.limit) !== null && _b !== void 0 ? _b : 15}`);
        const status = (0, utils_1.convertBoolean)(query.status);
        const sex = (0, utils_1.convertBoolean)(query.sex);
        const original_id = query.original_id;
        const response = await this.customerRepository
            .createQueryBuilder('tb_customer')
            .where({ deleted: false })
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.status ? { status: status } : {})))
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.sex ? { sex: sex } : {})))
            .andWhere(new typeorm_2.Brackets((qb) => {
            var _a, _b, _c, _d, _e;
            qb.where({ fullname: (0, typeorm_2.Like)(`%${(_a = query.search) !== null && _a !== void 0 ? _a : ''}%`) })
                .orWhere({ telephone: (0, typeorm_2.Like)(`%${(_b = query.search) !== null && _b !== void 0 ? _b : ''}`) })
                .orWhere({ email: (0, typeorm_2.Like)(`%${(_c = query.search) !== null && _c !== void 0 ? _c : ''}`) })
                .orWhere({ ccid: (0, typeorm_2.Like)(`%${(_d = query.search) !== null && _d !== void 0 ? _d : ''}`) })
                .orWhere({ full_address: (0, typeorm_2.Like)(`%${(_e = query.search) !== null && _e !== void 0 ? _e : ''}`) });
        }))
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(original_id ? 'tb_customer_original.id =:id' : '', original_id ? { id: original_id } : {})))
            .leftJoinAndSelect('tb_customer.customer_original', 'tb_customer_original')
            .leftJoin('tb_customer.avatar', 'tb_media')
            .addSelect(['tb_media.original_url'])
            .offset((page * limit) - limit)
            .limit(limit)
            .getManyAndCount();
        const customers = (_c = response[0]) === null || _c === void 0 ? void 0 : _c.map(item => {
            delete item.password;
            return item;
        });
        return (0, common_2.transformResponse)(customers, response[1], page, limit);
    }
    async findOne(id) {
        const response = await this.customerRepository
            .createQueryBuilder('tb_customer')
            .where({ id: id, deleted: false })
            .leftJoinAndSelect('tb_customer.customer_original', 'tb_customer_original')
            .leftJoin('tb_customer.avatar', 'tb_media')
            .addSelect(['tb_media.original_url'])
            .getOne();
        delete response.password;
        if (!response)
            throw new common_1.NotFoundException('Can not found');
        return { data: response };
    }
    async update(id, body) {
        if (body.dob && !(0, utils_1.isDateDobFormat)(body.dob)) {
            throw new common_1.BadRequestException('Date is must be format YYYY-MM-DD');
        }
        const response = await this.customerRepository
            .createQueryBuilder('tb_customer')
            .where({ id: id, deleted: false })
            .getOne();
        if (!response)
            throw new common_1.NotFoundException('Can not found');
        if (await this.customerRepository
            .createQueryBuilder('tb_customer')
            .where({ telephone: body.telephone })
            .getOne()) {
            throw new common_1.BadRequestException('`Telephone belong to another account`');
        }
        if (await this.customerRepository
            .createQueryBuilder('tb_customer')
            .where({ ccid: body.ccid })
            .getOne()) {
            throw new common_1.BadRequestException('`Ccid belong to another account`');
        }
        await this.customerRepository
            .createQueryBuilder('tb_customer')
            .update(customer_entity_1.Customer)
            .where({ id: id })
            .set({
            fullname: body.fullname,
            telephone: body.telephone,
            ccid: body.ccid,
            sex: body.sex,
            status: body.status,
            full_address: body.full_address,
            country: body.country,
            dob: body.dob,
            job: body.job,
            avatar: await this.mediaRe.createQueryBuilder('tb_media').where({ id: body.media_id }).getOne(),
            customer_original: await this.CustomerOriginalRe
                .createQueryBuilder('tb_customer_original')
                .where({ id: body.customerOriginalId })
                .getOne()
        })
            .execute();
        return { message: 'Update account success' };
    }
    async remove(id) {
        const response = await this.customerRepository
            .createQueryBuilder('tb_customer')
            .where({ id: id, deleted: false })
            .getOne();
        if (!response)
            throw new common_1.NotFoundException('Can not found');
        await this.customerRepository
            .createQueryBuilder('tb_customer')
            .update(customer_entity_1.Customer)
            .where({ id: id })
            .set({ deleted: true })
            .execute();
        return { message: 'Remove account success' };
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Media)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_2.CustomerOriginal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map