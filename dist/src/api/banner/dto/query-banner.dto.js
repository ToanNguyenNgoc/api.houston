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
exports.QueryBannerDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_banner_dto_1 = require("./create-banner.dto");
class QueryBannerDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1, required: false }),
    __metadata("design:type", Number)
], QueryBannerDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 15, required: false }),
    __metadata("design:type", Number)
], QueryBannerDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: create_banner_dto_1.BANNER_TYPE }),
    (0, class_validator_1.IsIn)([...create_banner_dto_1.BANNER_TYPE, null, undefined]),
    __metadata("design:type", String)
], QueryBannerDTO.prototype, "type", void 0);
exports.QueryBannerDTO = QueryBannerDTO;
//# sourceMappingURL=query-banner.dto.js.map