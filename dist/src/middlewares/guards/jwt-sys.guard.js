"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtSysGuard = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("../../common");
class JwtSysGuard extends (0, passport_1.AuthGuard)(common_1.name.JWT) {
}
exports.JwtSysGuard = JwtSysGuard;
//# sourceMappingURL=jwt-sys.guard.js.map