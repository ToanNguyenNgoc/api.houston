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
exports.VillaGalleryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const villagallery_service_1 = require("./villagallery.service");
const dto_1 = require("./dto");
const guards_1 = require("../../middlewares/guards");
const common_2 = require("../../common");
let VillaGalleryController = class VillaGalleryController {
    constructor(villaGalleryService) {
        this.villaGalleryService = villaGalleryService;
    }
    create(body) {
        return this.villaGalleryService.create(body);
    }
    findAll(query) {
        return this.villaGalleryService.findAll(query);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    (0, swagger_1.ApiBearerAuth)(common_2.name.JWT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateVillaGalleryDTO]),
    __metadata("design:returntype", void 0)
], VillaGalleryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryVillaGalleryDTO]),
    __metadata("design:returntype", void 0)
], VillaGalleryController.prototype, "findAll", null);
VillaGalleryController = __decorate([
    (0, swagger_1.ApiSecurity)(common_2.name.API_KEY),
    (0, swagger_1.ApiTags)('villa_galleries'),
    (0, common_1.Controller)('villa_galleries'),
    __metadata("design:paramtypes", [villagallery_service_1.VillaGalleryService])
], VillaGalleryController);
exports.VillaGalleryController = VillaGalleryController;
//# sourceMappingURL=villagallery.controller.js.map