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
exports.Branch = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../media/entities");
const entities_2 = require("../../account/entities");
const entities_3 = require("../../villa_cate/entities");
const entities_4 = require("../../villa/entities");
const entities_5 = require("../../province/entities");
const entities_6 = require("../../booking/entities");
const entities_7 = require("../../food_cate/entities");
const entities_8 = require("../../food/entities");
let Branch = class Branch {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Branch.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Branch.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_1.Media, (media) => media),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.Media)
], Branch.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 1000 }),
    __metadata("design:type", String)
], Branch.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 9500 }),
    __metadata("design:type", String)
], Branch.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Branch.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Branch.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Branch.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Branch.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_2.Account, (account) => account.branch),
    __metadata("design:type", Array)
], Branch.prototype, "accounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_3.VillaCate, (villa_cate) => villa_cate.branch),
    __metadata("design:type", Array)
], Branch.prototype, "villa_cates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_4.Villa, (villa) => villa.branch),
    __metadata("design:type", entities_4.Villa)
], Branch.prototype, "villas", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_5.Province, (province) => province.branches),
    __metadata("design:type", entities_5.Province)
], Branch.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_5.District, (district) => district.branches),
    __metadata("design:type", entities_5.District)
], Branch.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_5.Ward, (ward) => ward.branches),
    __metadata("design:type", entities_5.Ward)
], Branch.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_6.Booking, (booking) => booking.branch),
    __metadata("design:type", Array)
], Branch.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_7.FoodCate, (foodCate) => foodCate.branch),
    __metadata("design:type", Array)
], Branch.prototype, "food_cates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_8.Food, (food) => food.branch),
    __metadata("design:type", Array)
], Branch.prototype, "foods", void 0);
Branch = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_branch' })
], Branch);
exports.Branch = Branch;
//# sourceMappingURL=branch.entity.js.map