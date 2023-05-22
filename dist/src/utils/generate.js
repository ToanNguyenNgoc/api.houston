"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = void 0;
const bcrypt = require("bcrypt");
const generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const password_hashed = await bcrypt.hash(password, salt);
    return password_hashed;
};
exports.generatePassword = generatePassword;
//# sourceMappingURL=generate.js.map