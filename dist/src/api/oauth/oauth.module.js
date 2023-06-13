"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthModule = void 0;
const oauth_service_1 = require("./oauth.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../customer/entities");
const oauth_controller_1 = require("./oauth.controller");
const services_1 = require("../../services");
let OAuthModule = class OAuthModule {
};
OAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule, typeorm_1.TypeOrmModule.forFeature([entities_1.Customer])],
        controllers: [oauth_controller_1.OAuthController],
        providers: [oauth_service_1.OauthService, services_1.GenerateToken],
    })
], OAuthModule);
exports.OAuthModule = OAuthModule;
//# sourceMappingURL=oauth.module.js.map