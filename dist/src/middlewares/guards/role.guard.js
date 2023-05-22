"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
let RoleGuard = class RoleGuard {
    canActivate(context) {
        var _a, _b, _c, _d, _e;
        const { route, method, user } = context.switchToHttp().getRequest();
        if (user.type !== 'AUTHENTICATE') {
            throw new common_1.ForbiddenException('User does not have the right roles.');
        }
        const codes = (_a = user.roles) === null || _a === void 0 ? void 0 : _a.map(role => role.code);
        if (codes === null || codes === void 0 ? void 0 : codes.includes((0, utils_1.encode)(common_2.key.SUPER_ADMIN))) {
            return true;
        }
        const rules = (_e = (_d = (_c = (_b = user.roles) === null || _b === void 0 ? void 0 : _b.map(rule => rule.permissions)) === null || _c === void 0 ? void 0 : _c.flat()) === null || _d === void 0 ? void 0 : _d.map(per => per.permission_path)) !== null && _e !== void 0 ? _e : [];
        const path = route.path.split('/').filter(Boolean).join('.');
        const currentPath = `api.${path}.${method}`;
        if (rules.includes(currentPath)) {
            return true;
        }
        else {
            throw new common_1.ForbiddenException(`You cannot use method: ${method} with ${route.path}`);
        }
    }
};
RoleGuard = __decorate([
    (0, common_1.Injectable)()
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map