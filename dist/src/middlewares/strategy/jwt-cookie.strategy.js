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
var JwtCookieStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtCookieStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const bluebird_1 = require("bluebird");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
const entities_1 = require("../../api/account/entities");
const entities_2 = require("../../api/customer/entities");
let JwtCookieStrategy = JwtCookieStrategy_1 = class JwtCookieStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, common_2.name.JWT_COOKIE) {
    constructor(account, customer) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                JwtCookieStrategy_1.extractJWTFromCookie,
            ]),
            ignoreExpiration: false,
            secretOrKey: '141',
        });
        this.account = account;
        this.customer = customer;
    }
    static extractJWTFromCookie(req) {
        if (req.cookies && req.cookies.access_token) {
            return req.cookies.access_token;
        }
        return null;
    }
    async validate(payload) {
        var _a;
        const aesDe = (0, utils_1.aesDecode)(payload.code);
        const obj = JSON.parse(aesDe);
        if (obj.type === 'AUTHENTICATE') {
            const res = await this.account
                .createQueryBuilder('tb_account')
                .leftJoinAndSelect('tb_account.roles', 'tb_role')
                .leftJoinAndSelect('tb_role.permissions', 'tb_permission')
                .leftJoinAndSelect('tb_account.branch', 'tb_branch')
                .where({ id: obj.id, email: obj.email })
                .getOne();
            const account = Object.assign(Object.assign({}, res), { type: obj.type, roles: await bluebird_1.Promise.filter((_a = res === null || res === void 0 ? void 0 : res.roles) !== null && _a !== void 0 ? _a : [], async (role) => (role.status === true && role.deleted === false)) });
            return account;
        }
        if (obj.type === "CUSTOMER") {
            return obj;
        }
    }
};
JwtCookieStrategy = JwtCookieStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Account)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JwtCookieStrategy);
exports.JwtCookieStrategy = JwtCookieStrategy;
//# sourceMappingURL=jwt-cookie.strategy.js.map