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
exports.CompanyContact = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../company/entities");
let CompanyContact = class CompanyContact {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CompanyContact.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'TELEPHONE' }),
    __metadata("design:type", String)
], CompanyContact.prototype, "contact_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], CompanyContact.prototype, "contact_info", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CompanyContact.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CompanyContact.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CompanyContact.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CompanyContact.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Company, (company) => company.contacts),
    __metadata("design:type", entities_1.Company)
], CompanyContact.prototype, "company", void 0);
CompanyContact = __decorate([
    (0, typeorm_1.Entity)('tb_company_contact')
], CompanyContact);
exports.CompanyContact = CompanyContact;
//# sourceMappingURL=company_contact.entity.js.map