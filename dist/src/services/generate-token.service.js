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
exports.GenerateToken = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const moment = require("moment");
const utils_1 = require("../utils");
let GenerateToken = class GenerateToken {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async generateToken(id, email) {
        const code = JSON.stringify({ id: id, email: email, type: 'CUSTOMER' });
        const token = await this.jwtService.signAsync({ code: (0, utils_1.aesEncode)(code) }, {
            expiresIn: '2m',
            secret: process.env.JWT_KEY
        });
        const currentTime = new Date();
        const newTime = currentTime.getTime() + (60 * 1000 * 2) + (60 * 1000 * 60 * parseInt(process.env.TIME_ZONE_UTC));
        const token_expired_at = moment(newTime).format('YYYY-MM-DD HH:mm:ss');
        return { token, token_expired_at };
    }
    async generateRefreshToken(req, id, email) {
        const date = new Date();
        const refresh_token = await this.jwtService.signAsync({
            id: id,
            email: email,
            eTime: date.getTime(),
            type: 'CUSTOMER'
        }, {
            expiresIn: '15 days',
            secret: process.env.JWT_KEY
        });
        return refresh_token;
    }
};
GenerateToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], GenerateToken);
exports.GenerateToken = GenerateToken;
//# sourceMappingURL=generate-token.service.js.map