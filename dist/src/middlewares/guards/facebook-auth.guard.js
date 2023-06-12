"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const common_2 = require("../../common");
let FacebookAuthGuard = class FacebookAuthGuard extends (0, passport_1.AuthGuard)(common_2.name.FACEBOOK_AUTH) {
    async canActivate(context) {
        const active = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return active;
    }
};
FacebookAuthGuard = __decorate([
    (0, common_1.Injectable)()
], FacebookAuthGuard);
exports.FacebookAuthGuard = FacebookAuthGuard;
//# sourceMappingURL=facebook-auth.guard.js.map