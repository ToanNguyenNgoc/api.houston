"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const role_controller_1 = require("./role.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const permission_entity_1 = require("../permission/entities/permission.entity");
const generate_permission_1 = require("../../middlewares/generate-permission");
const entities_2 = require("../account/entities");
let RoleModule = class RoleModule {
    configure(consumer) {
        consumer
            .apply(generate_permission_1.GeneratePermissionMiddleware)
            .forRoutes(role_controller_1.RoleController);
    }
};
RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Role, permission_entity_1.Permission, entities_2.Account])],
        controllers: [role_controller_1.RoleController],
        providers: [role_service_1.RoleService]
    })
], RoleModule);
exports.RoleModule = RoleModule;
//# sourceMappingURL=role.module.js.map