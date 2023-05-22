"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCode = void 0;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const randomCode = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.randomCode = randomCode;
//# sourceMappingURL=random.js.map