import { ChannelLogService } from './channel-log.service';
import { CreateChannelLogDto } from './dto/create-channel-log.dto';
import { UpdateChannelLogDto } from './dto/update-channel-log.dto';
export declare class ChannelLogController {
    private readonly channelLogService;
    constructor(channelLogService: ChannelLogService);
    create(createChannelLogDto: CreateChannelLogDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateChannelLogDto: UpdateChannelLogDto): string;
    remove(id: string): string;
}
