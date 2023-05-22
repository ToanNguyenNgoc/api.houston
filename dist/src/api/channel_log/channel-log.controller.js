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
exports.ChannelLogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../middlewares/guards");
const channel_log_service_1 = require("./channel-log.service");
const create_channel_log_dto_1 = require("./dto/create-channel-log.dto");
const update_channel_log_dto_1 = require("./dto/update-channel-log.dto");
let ChannelLogController = class ChannelLogController {
    constructor(channelLogService) {
        this.channelLogService = channelLogService;
    }
    create(createChannelLogDto) {
        return this.channelLogService.create(createChannelLogDto);
    }
    findAll() {
        return this.channelLogService.findAll();
    }
    findOne(id) {
        return this.channelLogService.findOne(+id);
    }
    update(id, updateChannelLogDto) {
        return this.channelLogService.update(+id, updateChannelLogDto);
    }
    remove(id) {
        return this.channelLogService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_channel_log_dto_1.CreateChannelLogDto]),
    __metadata("design:returntype", void 0)
], ChannelLogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChannelLogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelLogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_channel_log_dto_1.UpdateChannelLogDto]),
    __metadata("design:returntype", void 0)
], ChannelLogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtSysGuard, guards_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelLogController.prototype, "remove", null);
ChannelLogController = __decorate([
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, common_1.Controller)('channel_logs'),
    (0, swagger_1.ApiTags)('channel_logs'),
    __metadata("design:paramtypes", [channel_log_service_1.ChannelLogService])
], ChannelLogController);
exports.ChannelLogController = ChannelLogController;
//# sourceMappingURL=channel-log.controller.js.map