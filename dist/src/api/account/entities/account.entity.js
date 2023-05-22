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
exports.Account = void 0;
const entities_1 = require("../../branches/entities");
const typeorm_1 = require("typeorm");
const entities_2 = require("../../role/entities");
const entities_3 = require("../../media/entities");
const entities_4 = require("../../booking/entities");
let Account = class Account {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Account.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Account.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Account.prototype, "full_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "ccid", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Account.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Account.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_2.Role),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Account.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Branch, (branch) => branch.accounts),
    __metadata("design:type", entities_1.Branch)
], Account.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_3.Media),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_3.Media)
], Account.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_4.Booking, (booking) => booking.employee),
    __metadata("design:type", Array)
], Account.prototype, "bookings", void 0);
Account = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_account' })
], Account);
exports.Account = Account;
//# sourceMappingURL=account.entity.js.map