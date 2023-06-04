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
exports.PaymentGatewayController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
let PaymentGatewayController = class PaymentGatewayController {
    vnpayStatus(res, query) {
        console.log(query);
        return res.redirect("https://houstongarden.click");
    }
};
__decorate([
    (0, common_1.Get)("vnpay_status"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.QueryVnpay]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "vnpayStatus", null);
PaymentGatewayController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)("payment_gateways")
], PaymentGatewayController);
exports.PaymentGatewayController = PaymentGatewayController;
//# sourceMappingURL=paymentgateway.controller.js.map