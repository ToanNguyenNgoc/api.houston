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
exports.VillaCate = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../media/entities");
const entities_2 = require("../../branches/entities");
const entities_3 = require("../../villa/entities");
let VillaCate = class VillaCate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VillaCate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VillaCate.prototype, "villa_cate_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VillaCate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_1.Media, (media) => media),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.Media)
], VillaCate.prototype, "villa_cate_image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_2.Branch, (branch) => branch.villa_cates),
    __metadata("design:type", entities_2.Branch)
], VillaCate.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], VillaCate.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], VillaCate.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VillaCate.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], VillaCate.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_3.Villa, (villa) => villa.villa_cate),
    __metadata("design:type", Array)
], VillaCate.prototype, "villas", void 0);
VillaCate = __decorate([
    (0, typeorm_1.Entity)('tb_villa_cate')
], VillaCate);
exports.VillaCate = VillaCate;
//# sourceMappingURL=villa_cate.entity.js.map