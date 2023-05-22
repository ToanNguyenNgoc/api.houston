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
exports.VillaCateController = void 0;
const common_1 = require("@nestjs/common");
const villa_cate_service_1 = require("./villa_cate.service");
const create_villa_cate_dto_1 = require("./dto/create-villa_cate.dto");
const update_villa_cate_dto_1 = require("./dto/update-villa_cate.dto");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const villa_cate_guard_1 = require("./villa_cate.guard");
const guards_1 = require("../../middlewares/guards");
const common_2 = require("../../common");
let VillaCateController = class VillaCateController {
    constructor(villaCateService) {
        this.villaCateService = villaCateService;
    }
    create(createVillaCateDto) {
        return this.villaCateService.create(createVillaCateDto);
    }
    findAll(query) {
        return this.villaCateService.findAll(query);
    }
    findOne(id) {
        return this.villaCateService.findOne(id);
    }
    update(id, updateVillaCateDto) {
        return this.villaCateService.update(id, updateVillaCateDto);
    }
    remove(id) {
        return this.villaCateService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_villa_cate_dto_1.CreateVillaCateDto]),
    __metadata("design:returntype", void 0)
], VillaCateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryVillaCateDTO]),
    __metadata("design:returntype", void 0)
], VillaCateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VillaCateController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard, villa_cate_guard_1.VillaCateGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_villa_cate_dto_1.UpdateVillaCateDto]),
    __metadata("design:returntype", void 0)
], VillaCateController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard, villa_cate_guard_1.VillaCateGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VillaCateController.prototype, "remove", null);
VillaCateController = __decorate([
    (0, swagger_1.ApiSecurity)(common_2.name.API_KEY),
    (0, swagger_1.ApiTags)('villa_cates'),
    (0, common_1.Controller)('villa_cates'),
    __metadata("design:paramtypes", [villa_cate_service_1.VillaCateService])
], VillaCateController);
exports.VillaCateController = VillaCateController;
//# sourceMappingURL=villa_cate.controller.js.map