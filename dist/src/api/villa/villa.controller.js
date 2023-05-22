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
exports.VillaController = void 0;
const common_1 = require("@nestjs/common");
const villa_service_1 = require("./villa.service");
const create_villa_dto_1 = require("./dto/create-villa.dto");
const update_villa_dto_1 = require("./dto/update-villa.dto");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const villa_guard_1 = require("./villa.guard");
const common_2 = require("../../common");
const guards_1 = require("../../middlewares/guards");
let VillaController = class VillaController {
    constructor(villaService) {
        this.villaService = villaService;
    }
    create(req, createVillaDto) {
        return this.villaService.create(req, createVillaDto);
    }
    findAll(query) {
        return this.villaService.findAll(query);
    }
    findOne(id, query) {
        return this.villaService.findOne(id, query);
    }
    update(req, id, updateVillaDto) {
        return this.villaService.update(id, req, updateVillaDto);
    }
    remove(id) {
        return this.villaService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_villa_dto_1.CreateVillaDto]),
    __metadata("design:returntype", void 0)
], VillaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryVillaDTO]),
    __metadata("design:returntype", void 0)
], VillaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.QueryByIdVillaDTO]),
    __metadata("design:returntype", void 0)
], VillaController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard, villa_guard_1.VillaGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_villa_dto_1.UpdateVillaDto]),
    __metadata("design:returntype", void 0)
], VillaController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard, villa_guard_1.VillaGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VillaController.prototype, "remove", null);
VillaController = __decorate([
    (0, swagger_1.ApiSecurity)(common_2.name.API_KEY),
    (0, swagger_1.ApiTags)('villas'),
    (0, common_1.Controller)('villas'),
    __metadata("design:paramtypes", [villa_service_1.VillaService])
], VillaController);
exports.VillaController = VillaController;
//# sourceMappingURL=villa.controller.js.map