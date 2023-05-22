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
exports.CustomerOriginalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_original_service_1 = require("./customer_original.service");
const create_customer_original_dto_1 = require("./dto/create-customer_original.dto");
const update_customer_original_dto_1 = require("./dto/update-customer_original.dto");
const guards_1 = require("../../middlewares/guards");
let CustomerOriginalController = class CustomerOriginalController {
    constructor(customerOriginalService) {
        this.customerOriginalService = customerOriginalService;
    }
    create(createCustomerOriginalDto) {
        return this.customerOriginalService.create(createCustomerOriginalDto);
    }
    findAll() {
        return this.customerOriginalService.findAll();
    }
    findOne(id) {
        return this.customerOriginalService.findOne(+id);
    }
    update(id, updateCustomerOriginalDto) {
        return this.customerOriginalService.update(+id, updateCustomerOriginalDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_original_dto_1.CreateCustomerOriginalDto]),
    __metadata("design:returntype", void 0)
], CustomerOriginalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerOriginalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerOriginalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_original_dto_1.UpdateCustomerOriginalDto]),
    __metadata("design:returntype", void 0)
], CustomerOriginalController.prototype, "update", null);
CustomerOriginalController = __decorate([
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, swagger_1.ApiTags)('customer_originals'),
    (0, common_1.Controller)('customer_originals'),
    __metadata("design:paramtypes", [customer_original_service_1.CustomerOriginalService])
], CustomerOriginalController);
exports.CustomerOriginalController = CustomerOriginalController;
//# sourceMappingURL=customer_original.controller.js.map