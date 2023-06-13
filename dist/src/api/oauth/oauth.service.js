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
exports.OauthService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../common");
const services_1 = require("../../services");
let OauthService = class OauthService {
    constructor(gTokenService) {
        this.gTokenService = gTokenService;
    }
    async onGoogleRedirect(req, res) {
        const cbHomeUrl = process.env.OAUTH_CALLBACK_HOME;
        const clientDomain = process.env.CLIENT_DOMAIN;
        try {
            const user = req.user;
            const { token, token_expired_at } = await this.gTokenService.generateToken(user.id, user.email);
            const refresh_token = await this.gTokenService.generateRefreshToken(req, user.id, user.email);
            return res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                domain: clientDomain,
                maxAge: common_2.name.AGE_RE_TOKEN
            })
                .cookie('token_expired_at', token_expired_at, {
                secure: true,
                domain: clientDomain,
                sameSite: 'lax',
                maxAge: common_2.name.AGE_RE_TOKEN
            })
                .cookie('access_token', token, {
                secure: true,
                domain: clientDomain,
                sameSite: 'lax',
                maxAge: common_2.name.AGE_RE_TOKEN
            }).redirect(cbHomeUrl);
        }
        catch (error) {
            return res.redirect(`${cbHomeUrl}/404`);
        }
    }
};
OauthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_1.GenerateToken])
], OauthService);
exports.OauthService = OauthService;
//# sourceMappingURL=oauth.service.js.map