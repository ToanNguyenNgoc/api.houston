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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../company_social/entities");
const entities_2 = require("../../company_contact/entities");
let Company = class Company {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_1.CompanySocial),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Company.prototype, "socials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_2.CompanyContact, (company_contact) => company_contact.company),
    __metadata("design:type", Array)
], Company.prototype, "contacts", void 0);
Company = __decorate([
    (0, typeorm_1.Entity)('tb_company')
], Company);
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map