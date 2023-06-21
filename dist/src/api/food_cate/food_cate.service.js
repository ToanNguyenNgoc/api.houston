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
exports.FoodCateService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../branches/entities");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_2 = require("./entities");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
let FoodCateService = class FoodCateService {
    constructor(branchRep, foodCateRep) {
        this.branchRep = branchRep;
        this.foodCateRep = foodCateRep;
    }
    async create(user, body) {
        var _a;
        try {
            const branch = await this.branchRep.createQueryBuilder('tb_branch')
                .where({ id: (_a = user.branch) === null || _a === void 0 ? void 0 : _a.id }).getOne();
            if (!branch)
                throw new common_1.NotFoundException('Not found branch');
            const foodCate = new entities_2.FoodCate();
            foodCate.name = body.name;
            foodCate.description = body.description;
            foodCate.branch = branch;
            const response = await this.foodCateRep.save(foodCate);
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
            const qb = this.foodCateRep.createQueryBuilder('tb_food_cate')
                .where({ deleted: false })
                .leftJoinAndSelect('tb_food_cate.branch', 'tb_branch');
            if (qr.branch_id) {
                qb.andWhere(new typeorm_1.Brackets((q) => q.where('tb_branch.id =:branch_id', { branch_id: qr.branch_id })));
            }
            if (qr.status) {
                qb.andWhere(new typeorm_1.Brackets((q) => q.where('tb_food_cate.status =:status', { status: status })));
            }
            const [response, total] = await qb
                .orderBy('tb_food_cate.created_at', 'DESC')
                .skip((page * limit) - limit).limit(limit).getManyAndCount();
            return (0, common_2.transformResponse)(response, total, page, limit);
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findOne(id) {
        try {
            const response = await this.foodCateRep.createQueryBuilder('tb_food_cate')
                .where({ id: id, deleted: false })
                .leftJoinAndSelect('tb_food_cate.branch', 'tb.branch')
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
        try {
            await this.foodCateRep.createQueryBuilder('tb_food_cate')
                .where({ id: id, deleted: false })
                .update(entities_2.FoodCate)
                .set({
                name: body.name,
                description: body.description,
                status: body.status
            })
                .execute();
            return { message: 'Update success' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async remove(id) {
        try {
            await this.foodCateRep.createQueryBuilder('tb_food_cate')
                .where({ id: id, deleted: false })
                .update(entities_2.FoodCate)
                .set({ deleted: true })
                .execute();
            return { message: 'Delete success' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
};
FoodCateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Branch)),
    __param(1, (0, typeorm_2.InjectRepository)(entities_2.FoodCate)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], FoodCateService);
exports.FoodCateService = FoodCateService;
//# sourceMappingURL=food_cate.service.js.map