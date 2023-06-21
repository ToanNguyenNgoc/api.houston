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
exports.FoodCate = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../branches/entities");
const entities_2 = require("../../food/entities");
let FoodCate = class FoodCate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FoodCate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Branch, (branch) => branch.food_cates),
    __metadata("design:type", entities_1.Branch)
], FoodCate.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FoodCate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 4000 }),
    __metadata("design:type", String)
], FoodCate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], FoodCate.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], FoodCate.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FoodCate.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FoodCate.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_2.Food, (food) => food.food_cate),
    __metadata("design:type", Array)
], FoodCate.prototype, "foods", void 0);
FoodCate = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_food_cate' })
], FoodCate);
exports.FoodCate = FoodCate;
//# sourceMappingURL=food_cate.entity.js.map