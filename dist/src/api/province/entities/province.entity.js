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
exports.Ward = exports.District = exports.Province = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../branches/entities");
let Province = class Province {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Province.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Province.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Province.prototype, "division_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Province.prototype, "codename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Province.prototype, "phone_code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Branch, (branch) => branch.province),
    __metadata("design:type", Array)
], Province.prototype, "branches", void 0);
Province = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_province' })
], Province);
exports.Province = Province;
let District = class District {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], District.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], District.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], District.prototype, "division_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], District.prototype, "codename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], District.prototype, "province_code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Branch, (branch) => branch.district),
    __metadata("design:type", Array)
], District.prototype, "branches", void 0);
District = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_district' })
], District);
exports.District = District;
let Ward = class Ward {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Ward.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ward.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ward.prototype, "division_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ward.prototype, "codename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Ward.prototype, "district_code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Branch, (branch) => branch.ward),
    __metadata("design:type", Array)
], Ward.prototype, "branches", void 0);
Ward = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_ward' })
], Ward);
exports.Ward = Ward;
//# sourceMappingURL=province.entity.js.map