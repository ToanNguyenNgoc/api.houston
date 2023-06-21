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
exports.FoodCateGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const typeorm_2 = require("typeorm");
let FoodCateGuard = class FoodCateGuard {
    constructor(foodCateRep) {
        this.foodCateRep = foodCateRep;
    }
    async canActivate(context) {
        var _a, _b;
        const { user, params } = context.switchToHttp().getRequest();
        const foodCateUp = await this.foodCateRep
            .createQueryBuilder('tb_food_cate')
            .where({ id: params.id })
            .leftJoin('tb_food_cate.branch', 'tb_branch')
            .addSelect(['tb_branch.id'])
            .getOne();
        if (!foodCateUp)
            throw new common_1.NotFoundException('Cannot found !');
        if (((_a = user.branch) === null || _a === void 0 ? void 0 : _a.id) !== ((_b = foodCateUp.branch) === null || _b === void 0 ? void 0 : _b.id)) {
            throw new common_1.ForbiddenException('You only handle food cate your branch !');
        }
        return true;
    }
};
FoodCateGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.FoodCate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FoodCateGuard);
exports.FoodCateGuard = FoodCateGuard;
//# sourceMappingURL=food_cate.guard.js.map