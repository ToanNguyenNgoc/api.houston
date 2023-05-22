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
exports.MapAddressController = exports.DistrictController = exports.ProvinceController = void 0;
const common_1 = require("@nestjs/common");
const province_service_1 = require("./province.service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../common");
const dto_1 = require("./dto");
let ProvinceController = class ProvinceController {
    constructor(provinceService) {
        this.provinceService = provinceService;
    }
    findAll() {
        return this.provinceService.findAll();
    }
    findDistricts(province_code) {
        return this.provinceService.findDistrictsByProvince(province_code);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProvinceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':province_code/districts'),
    __param(0, (0, common_1.Param)('province_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProvinceController.prototype, "findDistricts", null);
ProvinceController = __decorate([
    (0, swagger_1.ApiSecurity)(common_2.name.API_KEY),
    (0, swagger_1.ApiTags)('provinces & map places'),
    (0, common_1.Controller)('provinces'),
    __metadata("design:paramtypes", [province_service_1.ProvinceService])
], ProvinceController);
exports.ProvinceController = ProvinceController;
let DistrictController = class DistrictController {
    constructor(provinceService) {
        this.provinceService = provinceService;
    }
    findWards(district_code) {
        return this.provinceService.findWards(district_code);
    }
};
__decorate([
    (0, common_1.Get)(':district_code/wards'),
    __param(0, (0, common_1.Param)('district_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DistrictController.prototype, "findWards", null);
DistrictController = __decorate([
    (0, swagger_1.ApiTags)('provinces & map places'),
    (0, common_1.Controller)('districts'),
    __metadata("design:paramtypes", [province_service_1.ProvinceService])
], DistrictController);
exports.DistrictController = DistrictController;
let MapAddressController = class MapAddressController {
    constructor(provinceService) {
        this.provinceService = provinceService;
    }
    getPlaces(query) {
        return this.provinceService.getPlaces(query);
    }
};
__decorate([
    (0, common_1.Get)('places'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryMapDTO]),
    __metadata("design:returntype", void 0)
], MapAddressController.prototype, "getPlaces", null);
MapAddressController = __decorate([
    (0, swagger_1.ApiTags)('provinces & map places'),
    (0, common_1.Controller)('map_address'),
    __metadata("design:paramtypes", [province_service_1.ProvinceService])
], MapAddressController);
exports.MapAddressController = MapAddressController;
//# sourceMappingURL=province.controller.js.map