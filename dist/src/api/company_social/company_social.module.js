"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanySocialModule = void 0;
const common_1 = require("@nestjs/common");
const company_social_service_1 = require("./company_social.service");
const company_social_controller_1 = require("./company_social.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
let CompanySocialModule = class CompanySocialModule {
};
CompanySocialModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.CompanySocial])],
        controllers: [company_social_controller_1.CompanySocialController],
        providers: [company_social_service_1.CompanySocialService]
    })
], CompanySocialModule);
exports.CompanySocialModule = CompanySocialModule;
//# sourceMappingURL=company_social.module.js.map