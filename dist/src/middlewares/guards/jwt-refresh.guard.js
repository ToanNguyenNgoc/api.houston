"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshGuard = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("../../common");
class JwtRefreshGuard extends (0, passport_1.AuthGuard)(common_1.name.JWT_REFRESH) {
}
exports.JwtRefreshGuard = JwtRefreshGuard;
//# sourceMappingURL=jwt-refresh.guard.js.map