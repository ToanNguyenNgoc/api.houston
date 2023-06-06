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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../customer/entities");
const entities_2 = require("../../account/entities");
const entities_3 = require("../../villa/entities");
const entities_4 = require("../../branches/entities");
const entities_5 = require("../../payment_method/entities");
const entities_6 = require("../../payment_gateway/entities");
let Booking = class Booking {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Customer, (customer) => customer.bookings),
    __metadata("design:type", entities_1.Customer)
], Booking.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_2.Account, (account) => account.bookings),
    __metadata("design:type", entities_2.Account)
], Booking.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_2.Account, (account) => account.bookings),
    __metadata("design:type", entities_2.Account)
], Booking.prototype, "employee_update", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_3.Villa, (villa) => villa.bookings),
    __metadata("design:type", entities_3.Villa)
], Booking.prototype, "villa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_4.Branch, (branch) => branch.bookings),
    __metadata("design:type", entities_4.Branch)
], Booking.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "from_date_booking", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "to_date_booking", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Booking.prototype, "nights", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Booking.prototype, "customer_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Booking.prototype, "baby_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'PENDING' }),
    __metadata("design:type", String)
], Booking.prototype, "status_booking", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Booking.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'MANAGER' }),
    __metadata("design:type", String)
], Booking.prototype, "booking_platform", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_5.PaymentMethod, (payment_method) => payment_method.bookings),
    __metadata("design:type", entities_5.PaymentMethod)
], Booking.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_6.PaymentGateway),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_6.PaymentGateway)
], Booking.prototype, "payment_gateway", void 0);
Booking = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_booking' })
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=booking.entity.js.map