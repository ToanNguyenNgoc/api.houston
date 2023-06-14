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
exports.AuthCustomerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_customer_service_1 = require("./auth-customer.service");
const dto_1 = require("./dto");
const guards_1 = require("../../middlewares/guards");
const common_2 = require("../../common");
let AuthCustomerController = class AuthCustomerController {
    constructor(authCustomerService) {
        this.authCustomerService = authCustomerService;
    }
    register(body) {
        return this.authCustomerService.register(body);
    }
    login(req, body, res) {
        return this.authCustomerService.login(req, body, res);
    }
    logout(req, res) {
        return this.authCustomerService.logout(res);
    }
    refreshToken(req, res) {
        return this.authCustomerService.refreshToken(req, res);
    }
    forgot(body) {
        return this.authCustomerService.forgot(body);
    }
    profile(req) {
        return this.authCustomerService.profile(req);
    }
    updateProfile(req, body) {
        return this.authCustomerService.updateProfile(req, body);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterAuthCustomerDTO]),
    __metadata("design:returntype", void 0)
], AuthCustomerController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.LoginAuthCusDTO, Object]),
    __metadata("design:returntype", void 0)
], AuthCustomerController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthCustomerController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh_token'),
    (0, common_1.UseGuards)(guards_1.JwtRefreshGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthCustomerController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('forgot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ForgotAuthCustomer]),
    __metadata("design:returntype", void 0)
], AuthCustomerController.prototype, "forgot", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtSysGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthCustomerController.prototype, "profile", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtSysGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateAuthCustomerDto]),
    __metadata("design:returntype", void 0)
], AuthCustomerController.prototype, "updateProfile", null);
AuthCustomerController = __decorate([
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, swagger_1.ApiTags)('customers'),
    (0, common_1.Controller)('customers/auth'),
    __metadata("design:paramtypes", [auth_customer_service_1.AuthCustomerService])
], AuthCustomerController);
exports.AuthCustomerController = AuthCustomerController;
//# sourceMappingURL=auth-customer.controller.js.map