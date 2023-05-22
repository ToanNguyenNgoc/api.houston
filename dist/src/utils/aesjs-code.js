"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aesDecode = exports.aesEncode = void 0;
const aesjs = require("aes-js");
const aesEncode = (text) => {
    var _a, _b;
    const key = (_b = (_a = process.env.AES_JS_KEY) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.map(i => parseInt(i));
    const textBytes = aesjs.utils.utf8.toBytes(text);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
};
exports.aesEncode = aesEncode;
const aesDecode = (code) => {
    var _a, _b;
    const key = (_b = (_a = process.env.AES_JS_KEY) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.map(i => parseInt(i));
    const encryptedBytes = aesjs.utils.hex.toBytes(code);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
};
exports.aesDecode = aesDecode;
//# sourceMappingURL=aesjs-code.js.map