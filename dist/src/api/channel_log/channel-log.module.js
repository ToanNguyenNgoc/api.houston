"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelLogModule = void 0;
const common_1 = require("@nestjs/common");
const channel_log_service_1 = require("./channel-log.service");
const channel_log_controller_1 = require("./channel-log.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const generate_permission_1 = require("../../middlewares/generate-permission");
const permission_entity_1 = require("../permission/entities/permission.entity");
const entities_2 = require("../account/entities");
const entities_3 = require("../role/entities");
let ChannelLogModule = class ChannelLogModule {
    configure(consumer) {
        consumer
            .apply(generate_permission_1.GeneratePermissionMiddleware)
            .forRoutes(channel_log_controller_1.ChannelLogController);
    }
};
ChannelLogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.ChannelLog, permission_entity_1.Permission, entities_2.Account, entities_3.Role])],
        controllers: [channel_log_controller_1.ChannelLogController],
        providers: [channel_log_service_1.ChannelLogService]
    })
], ChannelLogModule);
exports.ChannelLogModule = ChannelLogModule;
//# sourceMappingURL=channel-log.module.js.map