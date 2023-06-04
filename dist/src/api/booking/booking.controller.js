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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingCustomerController = exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_dto_1 = require("./dto/update-booking.dto");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const booking_guard_1 = require("./booking.guard");
const common_2 = require("../../common");
const guards_1 = require("../../middlewares/guards");
const google_recaptcha_1 = require("@nestlab/google-recaptcha");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    create(req, createBookingDto) {
        return this.bookingService.create(req, createBookingDto);
    }
    findAll(req, query) {
        return this.bookingService.findAll(req, query);
    }
    findOne(req, id) {
        return this.bookingService.findOne(req, id);
    }
    update(req, id, body) {
        return this.bookingService.update(req, id, body);
    }
    remove(id) {
        return this.bookingService.remove(id);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.QueryBooking]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard, booking_guard_1.BookingGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard, booking_guard_1.BookingGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "remove", null);
BookingController = __decorate([
    (0, swagger_1.ApiTags)('bookings & bookings customer'),
    (0, common_1.Controller)('bookings'),
    (0, swagger_1.ApiSecurity)('x-api-key'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
exports.BookingController = BookingController;
let BookingCustomerController = class BookingCustomerController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    create(req, body) {
        return this.bookingService.createByCustomer(req, body);
    }
    findAll(req, query) {
        return this.bookingService.findAllByCustomer(req, query);
    }
    findOne(req, id) {
        return this.bookingService.findOneByCustomer(req, id);
    }
};
__decorate([
    (0, google_recaptcha_1.Recaptcha)({ response: req => req.body.recaptcha, action: 'BOOKING_CUSTOMER', score: 0.8 }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_booking_dto_1.CreateBookingCustomerDto]),
    __metadata("design:returntype", void 0)
], BookingCustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.QueryBookingCustomer]),
    __metadata("design:returntype", void 0)
], BookingCustomerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BookingCustomerController.prototype, "findOne", null);
BookingCustomerController = __decorate([
    (0, swagger_1.ApiTags)('bookings & bookings customer'),
    (0, common_1.Controller)('bookings_customer'),
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingCustomerController);
exports.BookingCustomerController = BookingCustomerController;
//# sourceMappingURL=booking.controller.js.map