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
exports.Food = void 0;
const entities_1 = require("../../branches/entities");
const entities_2 = require("../../food_cate/entities");
const entities_3 = require("../../media/entities");
const typeorm_1 = require("typeorm");
let Food = class Food {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Food.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Food.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_3.Media, (media) => media),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_3.Media)
], Food.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_2.FoodCate, (foodCate) => foodCate.foods),
    __metadata("design:type", entities_2.FoodCate)
], Food.prototype, "food_cate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Branch, (branch) => branch.foods),
    __metadata("design:type", entities_1.Branch)
], Food.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 500 }),
    __metadata("design:type", String)
], Food.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Food.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Food.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Food.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Food.prototype, "created_at", void 0);
Food = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_food' })
], Food);
exports.Food = Food;
//# sourceMappingURL=food.entity.js.map