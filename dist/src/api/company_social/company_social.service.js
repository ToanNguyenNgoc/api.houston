"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanySocialService = void 0;
const common_1 = require("@nestjs/common");
let CompanySocialService = class CompanySocialService {
    create(createCompanySocialDto) {
        return 'This action adds a new companySocial';
    }
    findAll() {
        return `This action returns all companySocial`;
    }
    findOne(id) {
        return `This action returns a #${id} companySocial`;
    }
    update(id, updateCompanySocialDto) {
        return `This action updates a #${id} companySocial`;
    }
    remove(id) {
        return `This action removes a #${id} companySocial`;
    }
};
CompanySocialService = __decorate([
    (0, common_1.Injectable)()
], CompanySocialService);
exports.CompanySocialService = CompanySocialService;
//# sourceMappingURL=company_social.service.js.map