"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChannelLogDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_channel_log_dto_1 = require("./create-channel-log.dto");
class UpdateChannelLogDto extends (0, mapped_types_1.PartialType)(create_channel_log_dto_1.CreateChannelLogDto) {
}
exports.UpdateChannelLogDto = UpdateChannelLogDto;
//# sourceMappingURL=update-channel-log.dto.js.map