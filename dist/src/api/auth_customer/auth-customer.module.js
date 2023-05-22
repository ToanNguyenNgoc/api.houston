"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCustomerModule = void 0;
const common_1 = require("@nestjs/common");
const auth_customer_service_1 = require("./auth-customer.service");
const auth_customer_controller_1 = require("./auth-customer.controller");
const entities_1 = require("../customer/entities");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const entities_2 = require("../otp/entities");
const services_1 = require("../../services");
const entities_3 = require("../media/entities");
const entities_4 = require("../refresh_token/entities");
let AuthCustomerModule = class AuthCustomerModule {
};
AuthCustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Customer, entities_2.OtpEntity, entities_3.Media, entities_4.RefreshToken]),
            jwt_1.JwtModule
        ],
        controllers: [auth_customer_controller_1.AuthCustomerController],
        providers: [auth_customer_service_1.AuthCustomerService, services_1.SendMailService]
    })
], AuthCustomerModule);
exports.AuthCustomerModule = AuthCustomerModule;
//# sourceMappingURL=auth-customer.module.js.map