"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
const base64 = require("base-64");
const utf8 = require("utf8");
function encode(text) {
    const bytes = utf8.encode(text);
    const code = base64.encode(bytes);
    return code;
}
exports.encode = encode;
function decode(code) {
    const types = base64.decode(code);
    const text = utf8.decode(types);
    return text;
}
exports.decode = decode;
//# sourceMappingURL=encode.js.map