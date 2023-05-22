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
exports.Villa = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../media/entities");
const entities_2 = require("../../villa_gallery/entities");
const entities_3 = require("../../branches/entities");
const entities_4 = require("../../villa_cate/entities");
const entities_5 = require("../../booking/entities");
const entities_6 = require("../../villa_room/entities");
let Villa = class Villa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Villa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Villa.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_1.Media),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.Media)
], Villa.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_2.VillaGallery, (villaGallery) => villaGallery.villa),
    __metadata("design:type", Array)
], Villa.prototype, "galleries", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 10000 }),
    __metadata("design:type", String)
], Villa.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_3.Branch, (branch) => branch.villas),
    __metadata("design:type", entities_3.Branch)
], Villa.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_4.VillaCate, (villaCate) => villaCate.villas),
    __metadata("design:type", entities_4.VillaCate)
], Villa.prototype, "villa_cate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Villa.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Villa.prototype, "special_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Villa.prototype, "holiday_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Villa.prototype, "weekend_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Villa.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Villa.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Villa.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Villa.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_5.Booking, (booking) => booking.villa),
    __metadata("design:type", Villa)
], Villa.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Villa.prototype, "acreage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_6.VillaRoom, (villaRoom) => villaRoom.villa),
    __metadata("design:type", Array)
], Villa.prototype, "rooms", void 0);
Villa = __decorate([
    (0, typeorm_1.Entity)('tb_villa')
], Villa);
exports.Villa = Villa;
//# sourceMappingURL=villa.entity.js.map