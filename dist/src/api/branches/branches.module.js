"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesModule = void 0;
const common_1 = require("@nestjs/common");
const branches_service_1 = require("./branches.service");
const branches_controller_1 = require("./branches.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const entities_2 = require("../province/entities");
const entities_3 = require("../media/entities");
const entities_4 = require("../villa/entities");
const entities_5 = require("../villa_gallery/entities");
let BranchesModule = class BranchesModule {
};
BranchesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Branch, entities_3.Media, entities_2.Province, entities_2.District, entities_2.Ward, entities_4.Villa, entities_5.VillaGallery])
        ],
        controllers: [branches_controller_1.BranchesController],
        providers: [
            branches_service_1.BranchesService
        ]
    })
], BranchesModule);
exports.BranchesModule = BranchesModule;
//# sourceMappingURL=branches.module.js.map