"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBooking = exports.QueryBookingCustomer = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QueryBase {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], QueryBase.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], QueryBase.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: ['PENDING', 'CANCEL', 'SUCCESS'] }),
    (0, class_validator_1.IsIn)(['PENDING', 'CANCEL', 'SUCCESS', null, undefined]),
    __metadata("design:type", String)
], QueryBase.prototype, "status_booking", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'full_address|villa_media' }),
    __metadata("design:type", String)
], QueryBase.prototype, "includes", void 0);
class QueryBookingCustomer extends QueryBase {
}
exports.QueryBookingCustomer = QueryBookingCustomer;
class QueryBooking extends QueryBase {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryBooking.prototype, "branch_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: ['MANAGER', 'WEB_CLIENT'] }),
    (0, class_validator_1.IsIn)(['MANAGER', 'WEB_CLIENT', null, undefined]),
    __metadata("design:type", String)
], QueryBooking.prototype, "booking_platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryBooking.prototype, "min_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], QueryBooking.prototype, "max_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Support fullname, email, telephone customer' }),
    __metadata("design:type", String)
], QueryBooking.prototype, "filter_customer", void 0);
exports.QueryBooking = QueryBooking;
//# sourceMappingURL=query-booking.dto.js.map