"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGatewayModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const paymentgateway_controller_1 = require("./paymentgateway.controller");
const entities_1 = require("./entities");
const paymentgateway_service_1 = require("./paymentgateway.service");
const common_1 = require("@nestjs/common");
const entities_2 = require("../booking/entities");
let PaymentGatewayModule = class PaymentGatewayModule {
};
PaymentGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_2.Booking, entities_1.PaymentGateway])],
        controllers: [
            paymentgateway_controller_1.PaymentGatewayController,
        ],
        providers: [paymentgateway_service_1.PaymentGatewayService],
    })
], PaymentGatewayModule);
exports.PaymentGatewayModule = PaymentGatewayModule;
//# sourceMappingURL=paymentgateway.module.js.map