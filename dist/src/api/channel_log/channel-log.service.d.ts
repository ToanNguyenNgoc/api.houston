import { CreateChannelLogDto } from './dto/create-channel-log.dto';
import { UpdateChannelLogDto } from './dto/update-channel-log.dto';
export declare class ChannelLogService {
    create(createChannelLogDto: CreateChannelLogDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateChannelLogDto: UpdateChannelLogDto): string;
    remove(id: number): string;
}
