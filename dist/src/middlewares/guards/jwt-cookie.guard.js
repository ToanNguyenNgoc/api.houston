"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtCookieGuard = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("../../common");
class JwtCookieGuard extends (0, passport_1.AuthGuard)(common_1.name.JWT_COOKIE) {
}
exports.JwtCookieGuard = JwtCookieGuard;
//# sourceMappingURL=jwt-cookie.guard.js.map