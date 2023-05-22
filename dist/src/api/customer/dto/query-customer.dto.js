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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryCustomerDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class QueryCustomerDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: 1 }),
    __metadata("design:type", Number)
], QueryCustomerDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: 15 }),
    __metadata("design:type", Number)
], QueryCustomerDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Support fullname, telephone, email, ccid, address' }),
    __metadata("design:type", String)
], QueryCustomerDTO.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], QueryCustomerDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], QueryCustomerDTO.prototype, "sex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryCustomerDTO.prototype, "original_id", void 0);
exports.QueryCustomerDTO = QueryCustomerDTO;
//# sourceMappingURL=query-customer.dto.js.map