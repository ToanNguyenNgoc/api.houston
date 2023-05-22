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
exports.CompanyContactController = void 0;
const common_1 = require("@nestjs/common");
const company_contact_service_1 = require("./company_contact.service");
const create_company_contact_dto_1 = require("./dto/create-company_contact.dto");
const update_company_contact_dto_1 = require("./dto/update-company_contact.dto");
const swagger_1 = require("@nestjs/swagger");
let CompanyContactController = class CompanyContactController {
    constructor(companyContactService) {
        this.companyContactService = companyContactService;
    }
    create(createCompanyContactDto) {
        return this.companyContactService.create(createCompanyContactDto);
    }
    findAll() {
        return this.companyContactService.findAll();
    }
    findOne(id) {
        return this.companyContactService.findOne(+id);
    }
    update(id, updateCompanyContactDto) {
        return this.companyContactService.update(+id, updateCompanyContactDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_contact_dto_1.CreateCompanyContactDto]),
    __metadata("design:returntype", void 0)
], CompanyContactController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanyContactController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyContactController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_contact_dto_1.UpdateCompanyContactDto]),
    __metadata("design:returntype", void 0)
], CompanyContactController.prototype, "update", null);
CompanyContactController = __decorate([
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, swagger_1.ApiTags)('company_contacts'),
    (0, common_1.Controller)('company_contacts'),
    __metadata("design:paramtypes", [company_contact_service_1.CompanyContactService])
], CompanyContactController);
exports.CompanyContactController = CompanyContactController;
//# sourceMappingURL=company_contact.controller.js.map