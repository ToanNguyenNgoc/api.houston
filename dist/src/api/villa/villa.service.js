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
exports.VillaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../villa_cate/entities");
const typeorm_2 = require("typeorm");
const entities_2 = require("./entities");
const entities_3 = require("../media/entities");
const entities_4 = require("../branches/entities");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
let VillaService = class VillaService {
    constructor(branchRe, villaCateRe, villaRe, mediaRe) {
        this.branchRe = branchRe;
        this.villaCateRe = villaCateRe;
        this.villaRe = villaRe;
        this.mediaRe = mediaRe;
    }
    async create(req, body) {
        var _a;
        if (body.special_price && body.price <= body.special_price) {
            throw new common_1.BadRequestException('Special price is always smaller than price');
        }
        const branch = await this.branchRe
            .createQueryBuilder('tb_branch')
            .where({
            id: (0, utils_1.isSPAdmin)(req.user) ? body.branch_id : req.user.branch.id,
            status: true
        })
            .getOne();
        if (!branch)
            throw new common_1.NotFoundException('Cannot found villa branch');
        const villaCate = await this.villaCateRe
            .createQueryBuilder('tb_villa_cate')
            .where({ id: body.villa_cate_id, status: true })
            .getOne();
        if (!villaCate)
            throw new common_1.NotFoundException('Cannot found villa category');
        const media = await this.mediaRe
            .createQueryBuilder('tb_media')
            .where({ id: body.media_id })
            .getOne();
        const villa = new entities_2.Villa();
        villa.name = body.name;
        villa.description = body.description;
        villa.thumbnail = media;
        villa.branch = branch;
        villa.villa_cate = villaCate;
        villa.price = body.price;
        villa.special_price = (_a = body.special_price) !== null && _a !== void 0 ? _a : body.price;
        villa.acreage = body.acreage;
        villa.holiday_price = body.holiday_price;
        villa.weekend_price = body.weekend_price;
        const response = await this.villaRe.save(villa);
        return { data: response };
    }
    async findAll(query) {
        var _a, _b, _c, _d, _e, _f;
        const page = parseInt(`${(_a = query.page) !== null && _a !== void 0 ? _a : 1}`);
        const limit = parseInt(`${(_b = query.limit) !== null && _b !== void 0 ? _b : 15}`);
        const status = (0, utils_1.convertBoolean)(query.status);
        const min_price = (_c = query.min_price) !== null && _c !== void 0 ? _c : 0;
        const max_price = (_d = query.max_price) !== null && _d !== void 0 ? _d : 10000000000;
        const joins = (_f = (_e = query.includes) === null || _e === void 0 ? void 0 : _e.split('|')) !== null && _f !== void 0 ? _f : [];
        let orderByPrice;
        if (query.sort_price === "-price")
            orderByPrice = "DESC";
        if (query.sort_price === "price")
            orderByPrice = "ASC";
        const queryBuilder = this.villaRe
            .createQueryBuilder('tb_villa')
            .where({ deleted: false })
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.status ? { status: status } : {})))
            .leftJoin('tb_villa.thumbnail', 'tb_media')
            .addSelect(['tb_media.original_url'])
            .leftJoinAndSelect('tb_villa.villa_cate', 'tb_villa_cate')
            .leftJoinAndSelect('tb_villa.branch', 'tb_branch')
            .andWhere(new typeorm_2.Brackets((qb) => {
            var _a;
            qb.where({ name: (0, typeorm_2.Like)(`%${(_a = query.search) !== null && _a !== void 0 ? _a : ''}%`) });
        }))
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.branch_id ? 'tb_branch.id =:branch_id' : '', query.branch_id ? { branch_id: query.branch_id } : {})))
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.villa_cate_id ? 'tb_villa_cate.id =:villa_cate_id' : '', query.villa_cate_id ? { villa_cate_id: query.villa_cate_id } : {})))
            .andWhere(min_price && max_price ?
            'tb_villa.special_price BETWEEN :min_price AND :max_price' :
            min_price ? 'tb_villa.special_price >= :min_price' :
                max_price ? 'tb_villa.special_price <= :max_price' :
                    '', {
            min_price: min_price,
            max_price: max_price
        })
            .orderBy(orderByPrice ? 'tb_villa_special_price' : 'tb_villa.created_at', orderByPrice ? orderByPrice : 'DESC')
            .offset((page * limit) - limit)
            .limit(limit);
        if (joins.includes('full_address')) {
            queryBuilder
                .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
                .leftJoinAndSelect('tb_branch.district', 'tb_district')
                .leftJoinAndSelect('tb_branch.province', 'tb_province');
        }
        const response = await queryBuilder.getManyAndCount();
        return (0, common_2.transformResponse)(response[0], response[1], page, limit);
    }
    async findOne(id, query) {
        var _a, _b;
        const joins = (_b = (_a = query.includes) === null || _a === void 0 ? void 0 : _a.split('|')) !== null && _b !== void 0 ? _b : [];
        const queryBuilder = this.villaRe
            .createQueryBuilder('tb_villa')
            .where({ id: id })
            .leftJoin('tb_villa.thumbnail', 'tb_media')
            .addSelect(['tb_media.original_url']);
        if (joins.includes('category')) {
            queryBuilder
                .leftJoinAndSelect('tb_villa.villa_cate', 'tb_villa_cate');
        }
        if (joins.includes('branch')) {
            queryBuilder
                .leftJoinAndSelect('tb_villa.branch', 'tb_branch');
        }
        if (joins.includes('full_address')) {
            queryBuilder
                .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
                .leftJoinAndSelect('tb_branch.district', 'tb_district')
                .leftJoinAndSelect('tb_branch.province', 'tb_province');
        }
        if (!await queryBuilder.getOne()) {
            throw new common_1.NotFoundException('Cannot found');
        }
        return { data: await queryBuilder.getOne() };
    }
    async update(id, req, body) {
        try {
            const response = await this.villaRe
                .createQueryBuilder('tb_villa')
                .where({ id: id, deleted: false })
                .getOne();
            if (!response)
                throw new common_1.NotFoundException('Cannot found villa');
            if (body.price && body.special_price && body.special_price > body.price) {
                throw new common_1.BadRequestException('Special price is always smaller than price');
            }
            if (!body.price && body.special_price > response.price) {
                throw new common_1.BadRequestException('Special price is always smaller than price');
            }
            await this.villaRe.createQueryBuilder('tb_villa')
                .where({ id: id })
                .update(entities_2.Villa)
                .set({
                branch: (0, utils_1.isSPAdmin)(req.user) ? await this.branchRe
                    .createQueryBuilder('tb_branch')
                    .where({ id: body.branch_id, deleted: false })
                    .getOne()
                    :
                        undefined,
                name: body.name,
                villa_cate: body.villa_cate_id ? await this.villaCateRe
                    .createQueryBuilder('tb_villa_cate')
                    .where({ id: body.villa_cate_id, deleted: false })
                    .getOne()
                    :
                        undefined,
                thumbnail: body.media_id ? await this.mediaRe
                    .createQueryBuilder('tb_media')
                    .where({ id: body.media_id })
                    .getOne()
                    :
                        undefined,
                description: body.description,
                price: body.price,
                special_price: body.special_price,
                holiday_price: body.holiday_price,
                weekend_price: body.weekend_price,
                acreage: body.acreage,
                status: body.status
            })
                .execute();
            return { message: 'Update success !' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async remove(id) {
        try {
            await this.villaRe.createQueryBuilder('tb_villa')
                .where({ id: id })
                .update(entities_2.Villa)
                .set({ deleted: true })
                .execute();
            return { message: 'Delete success !' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
};
VillaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_4.Branch)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.VillaCate)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_2.Villa)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_3.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VillaService);
exports.VillaService = VillaService;
//# sourceMappingURL=villa.service.js.map