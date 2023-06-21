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
exports.FoodCateController = void 0;
const common_1 = require("@nestjs/common");
const food_cate_service_1 = require("./food_cate.service");
const create_food_cate_dto_1 = require("./dto/create-food_cate.dto");
const update_food_cate_dto_1 = require("./dto/update-food_cate.dto");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../middlewares/guards");
const common_2 = require("../../common");
const dto_1 = require("./dto");
const food_cate_guard_1 = require("./food_cate.guard");
let FoodCateController = class FoodCateController {
    constructor(foodCateService) {
        this.foodCateService = foodCateService;
    }
    create(req, body) {
        return this.foodCateService.create(req.user, body);
    }
    findAll(qr) {
        return this.foodCateService.findAll(qr);
    }
    findOne(id) {
        return this.foodCateService.findOne(id);
    }
    update(id, body) {
        return this.foodCateService.update(id, body);
    }
    remove(id) {
        return this.foodCateService.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_food_cate_dto_1.CreateFoodCateDto]),
    __metadata("design:returntype", void 0)
], FoodCateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QrCateFoodDTO]),
    __metadata("design:returntype", void 0)
], FoodCateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoodCateController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard, food_cate_guard_1.FoodCateGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_food_cate_dto_1.UpdateFoodCateDto]),
    __metadata("design:returntype", void 0)
], FoodCateController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard, food_cate_guard_1.FoodCateGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoodCateController.prototype, "remove", null);
FoodCateController = __decorate([
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, swagger_1.ApiTags)('food_cates'),
    (0, common_1.Controller)('food_cates'),
    __metadata("design:paramtypes", [food_cate_service_1.FoodCateService])
], FoodCateController);
exports.FoodCateController = FoodCateController;
//# sourceMappingURL=food_cate.controller.js.map