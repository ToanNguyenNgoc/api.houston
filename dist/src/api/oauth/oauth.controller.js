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
exports.OAuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../middlewares/guards");
const oauth_service_1 = require("./oauth.service");
let OAuthController = class OAuthController {
    constructor(oauthService) {
        this.oauthService = oauthService;
    }
    onSignInGoogle() {
        return { data: {} };
    }
    async onRedirect(req, res) {
        return this.oauthService.onGoogleRedirect(req, res);
    }
    onSignFacebook() {
        return { data: {} };
    }
    onFaceRedirect(req) {
        return req.user;
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.OAuthGuard),
    (0, common_1.Get)('google/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OAuthController.prototype, "onSignInGoogle", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.UseGuards)(guards_1.OAuthGuard),
    (0, common_1.Get)('google/redirect'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "onRedirect", null);
__decorate([
    (0, common_1.Get)('facebook/login'),
    (0, common_1.UseGuards)(guards_1.FacebookAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OAuthController.prototype, "onSignFacebook", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.UseGuards)(guards_1.FacebookAuthGuard),
    (0, common_1.Get)('facebook/redirect'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OAuthController.prototype, "onFaceRedirect", null);
OAuthController = __decorate([
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, swagger_1.ApiTags)('customers'),
    (0, common_1.Controller)('customers/auth'),
    __metadata("design:paramtypes", [oauth_service_1.OauthService])
], OAuthController);
exports.OAuthController = OAuthController;
//# sourceMappingURL=oauth.controller.js.map