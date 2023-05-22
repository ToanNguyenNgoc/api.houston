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
exports.QueryByIdVillaDTO = exports.QueryVillaDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QueryVillaDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryVillaDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryVillaDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryVillaDTO.prototype, "branch_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryVillaDTO.prototype, "villa_cate_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], QueryVillaDTO.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], QueryVillaDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryVillaDTO.prototype, "min_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryVillaDTO.prototype, "max_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '-price or price' }),
    (0, class_validator_1.IsIn)(['-price', 'price', null, undefined]),
    __metadata("design:type", String)
], QueryVillaDTO.prototype, "sort_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'full_address' }),
    (0, class_validator_1.IsIn)(['full_address', null, undefined]),
    __metadata("design:type", String)
], QueryVillaDTO.prototype, "includes", void 0);
exports.QueryVillaDTO = QueryVillaDTO;
class QueryByIdVillaDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'category|branch|full_address' }),
    __metadata("design:type", String)
], QueryByIdVillaDTO.prototype, "includes", void 0);
exports.QueryByIdVillaDTO = QueryByIdVillaDTO;
//# sourceMappingURL=query-villa.dto.js.map