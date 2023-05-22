"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillaModule = void 0;
const common_1 = require("@nestjs/common");
const villa_service_1 = require("./villa.service");
const villa_controller_1 = require("./villa.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../villa_cate/entities");
const entities_2 = require("./entities");
const entities_3 = require("../media/entities");
const entities_4 = require("../villa_gallery/entities");
const entities_5 = require("../branches/entities");
const entities_6 = require("../booking/entities");
let VillaModule = class VillaModule {
};
VillaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                entities_1.VillaCate,
                entities_2.Villa,
                entities_4.VillaGallery,
                entities_3.Media,
                entities_5.Branch,
                entities_6.Booking
            ])],
        controllers: [villa_controller_1.VillaController],
        providers: [villa_service_1.VillaService]
    })
], VillaModule);
exports.VillaModule = VillaModule;
//# sourceMappingURL=villa.module.js.map