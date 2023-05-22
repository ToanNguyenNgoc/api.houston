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
exports.CompanySocialController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const company_social_service_1 = require("./company_social.service");
const create_company_social_dto_1 = require("./dto/create-company_social.dto");
const update_company_social_dto_1 = require("./dto/update-company_social.dto");
let CompanySocialController = class CompanySocialController {
    constructor(companySocialService) {
        this.companySocialService = companySocialService;
    }
    create(createCompanySocialDto) {
        return this.companySocialService.create(createCompanySocialDto);
    }
    findAll() {
        return this.companySocialService.findAll();
    }
    findOne(id) {
        return this.companySocialService.findOne(+id);
    }
    update(id, updateCompanySocialDto) {
        return this.companySocialService.update(+id, updateCompanySocialDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_social_dto_1.CreateCompanySocialDto]),
    __metadata("design:returntype", void 0)
], CompanySocialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanySocialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanySocialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_social_dto_1.UpdateCompanySocialDto]),
    __metadata("design:returntype", void 0)
], CompanySocialController.prototype, "update", null);
CompanySocialController = __decorate([
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, swagger_1.ApiTags)('company_socials'),
    (0, common_1.Controller)('company_socials'),
    __metadata("design:paramtypes", [company_social_service_1.CompanySocialService])
], CompanySocialController);
exports.CompanySocialController = CompanySocialController;
//# sourceMappingURL=company_social.controller.js.map