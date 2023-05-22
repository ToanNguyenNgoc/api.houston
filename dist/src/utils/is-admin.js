"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSPAdmin = void 0;
const common_1 = require("../common");
const encode_1 = require("./encode");
function isSPAdmin(account) {
    let result = false;
    const roles = account.roles.map(item => item.code);
    if (roles.includes((0, encode_1.encode)(common_1.key.SUPER_ADMIN))) {
        result = true;
    }
    return result;
}
exports.isSPAdmin = isSPAdmin;
//# sourceMappingURL=is-admin.js.map