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
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const common_2 = require("../../common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../api/customer/entities");
const typeorm_2 = require("typeorm");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, common_2.name.GOOGLE_OAUTH_2) {
    constructor(customerRep) {
        super({
            clientID: '433603162729-lmpo28268ebcs22baqiqnelp74a83qea.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3003/customers/auth/google/redirect',
            scope: ['profile', 'email']
        });
        this.customerRep = customerRep;
    }
    async validate(accessToken, refreshToken, profile) {
        return profile;
    }
};
GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map