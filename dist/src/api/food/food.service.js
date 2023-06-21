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
exports.FoodService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../branches/entities");
const typeorm_2 = require("typeorm");
const entities_2 = require("../food_cate/entities");
const entities_3 = require("../media/entities");
const entities_4 = require("./entities");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
let FoodService = class FoodService {
    constructor(branchRep, foodCateRep, mediaRep, foodRep) {
        this.branchRep = branchRep;
        this.foodCateRep = foodCateRep;
        this.mediaRep = mediaRep;
        this.foodRep = foodRep;
    }
    async create(user, body) {
        var _a, _b;
        try {
            const branch = await this.branchRep.createQueryBuilder('tb_branch')
                .where({ id: (_a = user.branch) === null || _a === void 0 ? void 0 : _a.id }).getOne();
            if (!branch)
                throw new common_1.NotFoundException('Cannot found branch');
            const foodCate = await this.foodCateRep.createQueryBuilder('tb_food_cate')
                .where({ id: body.food_cate })
                .leftJoin('tb_food_cate.branch', 'tb_branch').addSelect(['tb_branch.id'])
                .getOne();
            if (!foodCate)
                throw new common_1.NotFoundException('Cannot found food category');
            if (((_b = foodCate.branch) === null || _b === void 0 ? void 0 : _b.id) !== branch.id) {
                throw new common_1.ForbiddenException('You cannot use food category other branch');
            }
            const media = await this.mediaRep.createQueryBuilder('tb_media')
                .where({ id: body.media }).getOne();
            const food = new entities_4.Food();
            food.name = body.name,
                food.description = body.description,
                food.media = media,
                food.branch = branch,
                food.food_cate = foodCate;
            const response = await this.foodRep.save(food);
            return { data: response };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findAll(qr) {
        var _a, _b;
        try {
            const page = parseInt(`${(_a = qr.page) !== null && _a !== void 0 ? _a : 1}`);
            const limit = parseInt(`${(_b = qr.limit) !== null && _b !== void 0 ? _b : 15}`);
            const status = (0, utils_1.convertBoolean)(qr.status);
            const qb = this.foodRep.createQueryBuilder('tb_food').where({ deleted: false })
                .leftJoin('tb_food.media', 'tb_media').addSelect(['tb_media.original_url'])
                .leftJoinAndSelect('tb_food.branch', 'tb_branch')
                .leftJoinAndSelect('tb_food.food_cate', 'tb_food_cate');
            if (qr.search) {
                qb.andWhere(new typeorm_2.Brackets((q) => q
                    .where({ name: (0, typeorm_2.Like)(`%${qr.search}%`) })
                    .orWhere({ description: (0, typeorm_2.Like)(`%${qr.search}%`) })));
            }
            if (qr.branch_id) {
                qb.andWhere(new typeorm_2.Brackets((q) => q.where('tb_branch.id =:branch_id', { branch_id: qr.branch_id })));
            }
            if (qr.food_cate_id) {
                qb.andWhere(new typeorm_2.Brackets((q) => q.where('tb_food_cate.id =:food_cate_id', { food_cate_id: qr.food_cate_id })));
            }
            if (qr.status) {
                qb.andWhere(new typeorm_2.Brackets((q) => q.where('tb_food.status =:status', { status: status })));
            }
            qb.orderBy('tb_food.created_at', 'DESC');
            const [response, total] = await qb.skip((page * limit) - limit).limit(limit).getManyAndCount();
            return (0, common_2.transformResponse)(response, total, page, limit);
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findOne(id) {
        try {
            const response = await this.foodRep.createQueryBuilder('tb_food')
                .where({ deleted: false, id: id })
                .leftJoin('tb_food.media', 'tb_media').addSelect(['tb_media.original_url'])
                .leftJoinAndSelect('tb_food.branch', 'tb_branch')
                .leftJoinAndSelect('tb_food.food_cate', 'tb_food_cate')
                .getOne();
            if (!response)
                throw new common_1.NotFoundException('Cannot found');
            return { data: response };
        }
        catch (error) {
            throw new common_1.NotFoundException('Cannot found');
        }
    }
    async update(id, body) {
        await this.foodRep.createQueryBuilder('tb_food')
            .where({ id: id, deleted: false })
            .update(entities_4.Food)
            .set({
            name: body.name,
            description: body.description,
            food_cate: body.description ?
                await this.foodCateRep.createQueryBuilder('tb_food_cate').where({ id: body.food_cate_id }).getOne()
                :
                    undefined,
            media: body.media ?
                await this.mediaRep.createQueryBuilder('tb_media').where({ id: body.media }).getOne()
                :
                    undefined,
            status: body.status
        })
            .execute();
        return { message: 'Update success' };
    }
    async remove(id) {
        try {
            await this.foodRep.createQueryBuilder('tb_food')
                .where({ id: id })
                .update(entities_4.Food)
                .set({ deleted: true })
                .execute();
            return { message: 'Delete success' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
};
FoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Branch)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.FoodCate)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_3.Media)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_4.Food)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FoodService);
exports.FoodService = FoodService;
//# sourceMappingURL=food.service.js.map