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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const role_service_1 = require("./role.service");
const guards_1 = require("../../middlewares/guards");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../common");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    findAll(query) {
        return this.roleService.fillAll(query);
    }
    findOne(id) {
        return this.roleService.findOne(id);
    }
    create(body) {
        return this.roleService.create(body);
    }
    update(request, id, body) {
        return this.roleService.update(id, body);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryRoleDTO]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRoleDTO]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, dto_1.UpdateRoleDTO]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "update", null);
RoleController = __decorate([
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, common_1.Controller)('roles'),
    (0, swagger_1.ApiTags)('roles'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map