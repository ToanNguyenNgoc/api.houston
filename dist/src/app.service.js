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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utils_1 = require("./utils");
const moment = require("moment");
const entities_1 = require("./api/role/entities");
const typeorm_2 = require("typeorm");
let AppService = class AppService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async getHello() {
        await this.initial();
        return `Web Api Houston's services ${moment().format('YYYY/MM/DD-HH')}`;
    }
    async initial() {
        const count = await this.roleRepository.count();
        const initRole = new entities_1.Role();
        initRole.title = 'Super Admin';
        initRole.code = (0, utils_1.encode)('Super Admin');
        if (count === 0) {
            await this.roleRepository.save(initRole);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map