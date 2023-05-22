"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelLogService = void 0;
const common_1 = require("@nestjs/common");
let ChannelLogService = class ChannelLogService {
    create(createChannelLogDto) {
        return 'This action adds a new channelLog';
    }
    findAll() {
        return `This action returns all channelLog`;
    }
    findOne(id) {
        return `This action returns a #${id} channelLog`;
    }
    update(id, updateChannelLogDto) {
        return `This action updates a #${id} channelLog`;
    }
    remove(id) {
        return `This action removes a #${id} channelLog`;
    }
};
ChannelLogService = __decorate([
    (0, common_1.Injectable)()
], ChannelLogService);
exports.ChannelLogService = ChannelLogService;
//# sourceMappingURL=channel-log.service.js.map