"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = exports.isDateDobFormat = exports.isDateFormat = void 0;
const isDateFormat = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(date);
};
exports.isDateFormat = isDateFormat;
const isDateDobFormat = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}/;
    return regex.test(date);
};
exports.isDateDobFormat = isDateDobFormat;
const formatPrice = (price) => {
    return price === null || price === void 0 ? void 0 : price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};
exports.formatPrice = formatPrice;
//# sourceMappingURL=format.js.map