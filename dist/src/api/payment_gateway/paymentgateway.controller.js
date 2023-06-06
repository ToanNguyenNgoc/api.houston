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
const paymentgateway_service_1 = require("./paymentgateway.service");
const common_2 = require("../../common");
const guards_1 = require("../../middlewares/guards");
let PaymentGatewayController = class PaymentGatewayController {
    constructor(paymentGatewayService) {
        this.paymentGatewayService = paymentGatewayService;
    }
    async vnpayCallBackUrl(req, query, res) {
        return this.paymentGatewayService.updateStatus(req, query, res);
    }
    status(req, query) {
        return this.paymentGatewayService.status(req, query);
    }
};
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)("callback_url"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentGatewayController.prototype, "vnpayCallBackUrl", null);
__decorate([
    (0, common_1.Get)("status"),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, swagger_1.ApiSecurity)('x-api-key'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.QueryVnpay]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "status", null);
PaymentGatewayController = __decorate([
    (0, common_1.Controller)("payment_gateways"),
    (0, swagger_1.ApiTags)("payment_gateways"),
    __metadata("design:paramtypes", [paymentgateway_service_1.PaymentGatewayService])
], PaymentGatewayController);
exports.PaymentGatewayController = PaymentGatewayController;
//# sourceMappingURL=paymentgateway.controller.js.map