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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../company_social/entities");
const entities_2 = require("./entities");
const entities_3 = require("../media/entities");
const entities_4 = require("../company_contact/entities");
const bluebird_1 = require("bluebird");
let CompanyService = class CompanyService {
    constructor(companyRe, companySocialRe, mediaRe, contactRe) {
        this.companyRe = companyRe;
        this.companySocialRe = companySocialRe;
        this.mediaRe = mediaRe;
        this.contactRe = contactRe;
    }
    async create(body) {
        const contacts = await bluebird_1.Promise.map(body.contacts, async (contact_id) => {
            return await this.contactRe
                .createQueryBuilder('tb_company_contact')
                .where({ id: contact_id })
                .andWhere(new typeorm_2.Brackets((qb) => qb.where({ id: null })))
                .getOne();
        }).filter(Boolean);
        const company = new entities_2.Company();
        company.name = body.name;
        company.contacts = contacts;
        const response = await this.companyRe.save(company);
        return { data: response };
    }
    async findAll() {
        const response = await this.companyRe
            .createQueryBuilder('tb_company')
            .leftJoinAndSelect('tb_company.socials', 'tb_company_social')
            .leftJoinAndSelect('tb_company.contacts', 'tb_company_contact')
            .getManyAndCount();
        const data = response[0].map(item => {
            return Object.assign(Object.assign({}, item), { socials: item.socials.filter(i => i.status === true) });
        });
        return { data: data };
    }
    findOne(id) {
        return `This action returns a #${id} company`;
    }
    update(id, updateCompanyDto) {
        return `This action updates a #${id} company`;
    }
    remove(id) {
        return `This action removes a #${id} company`;
    }
};
CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_2.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.CompanySocial)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_3.Media)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_4.CompanyContact)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map