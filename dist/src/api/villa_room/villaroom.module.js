"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillaRoomModule = void 0;
const common_1 = require("@nestjs/common");
const villaroom_service_1 = require("./villaroom.service");
const villaroom_controller_1 = require("./villaroom.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const entities_2 = require("../villa/entities");
const entities_3 = require("../media/entities");
let VillaRoomModule = class VillaRoomModule {
};
VillaRoomModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.VillaRoom, entities_2.Villa, entities_3.Media])],
        controllers: [villaroom_controller_1.VillaRoomController],
        providers: [villaroom_service_1.VillaRoomService],
    })
], VillaRoomModule);
exports.VillaRoomModule = VillaRoomModule;
//# sourceMappingURL=villaroom.module.js.map