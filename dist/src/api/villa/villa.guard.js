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
exports.VillaGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
let VillaGuard = class VillaGuard {
    constructor(villaRe) {
        this.villaRe = villaRe;
    }
    async canActivate(context) {
        var _a, _b, _c, _d;
        const { user, params } = context.switchToHttp().getRequest();
        const codes = (_a = user.roles) === null || _a === void 0 ? void 0 : _a.map(role => role.code);
        if (codes === null || codes === void 0 ? void 0 : codes.includes((0, utils_1.encode)(common_2.key.SUPER_ADMIN))) {
            return true;
        }
        const villaUpdate = await this.villaRe
            .createQueryBuilder('tb_villa')
            .where({ id: params.id })
            .leftJoinAndSelect('tb_villa.villa_cate', 'tb_villa_cate')
            .leftJoin('tb_villa_cate.branch', 'tb_branch')
            .addSelect(['tb_branch.id'])
            .getOne();
        if (!villaUpdate)
            throw new common_1.NotFoundException('Cannot found !');
        if (((_b = user.branch) === null || _b === void 0 ? void 0 : _b.id) !== ((_d = (_c = villaUpdate.villa_cate) === null || _c === void 0 ? void 0 : _c.branch) === null || _d === void 0 ? void 0 : _d.id)) {
            throw new common_1.ForbiddenException('You only update villa your branch !');
        }
        return true;
    }
};
VillaGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Villa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VillaGuard);
exports.VillaGuard = VillaGuard;
//# sourceMappingURL=villa.guard.js.map