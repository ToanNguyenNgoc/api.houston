"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeDate = void 0;
const rangeDate = (dateFrom, dateTo) => {
    const startTime = new Date(dateFrom);
    const endTime = new Date(dateTo);
    const timeDiff = endTime.getTime() - startTime.getTime();
    const date = timeDiff / (1000 * 60 * 60 * 24);
    return date;
};
exports.rangeDate = rangeDate;
//# sourceMappingURL=rang-time.js.map