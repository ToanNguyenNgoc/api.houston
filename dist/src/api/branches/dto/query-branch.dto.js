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
exports.QueryBranchDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class QueryBranchDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1, required: false }),
    __metadata("design:type", Number)
], QueryBranchDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 15, required: false }),
    __metadata("design:type", Number)
], QueryBranchDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Support name', required: false }),
    __metadata("design:type", String)
], QueryBranchDTO.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], QueryBranchDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryBranchDTO.prototype, "province_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryBranchDTO.prototype, "district_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryBranchDTO.prototype, "ward_code", void 0);
exports.QueryBranchDTO = QueryBranchDTO;
//# sourceMappingURL=query-branch.dto.js.map