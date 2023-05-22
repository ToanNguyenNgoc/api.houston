import { Injectable } from '@nestjs/common';
import { CreateChannelLogDto } from './dto/create-channel-log.dto';
import { UpdateChannelLogDto } from './dto/update-channel-log.dto';

@Injectable()
export class ChannelLogService {
  create(createChannelLogDto: CreateChannelLogDto) {
    return 'This action adds a new channelLog';
  }

  findAll() {
    return `This action returns all channelLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channelLog`;
  }

  update(id: number, updateChannelLogDto: UpdateChannelLogDto) {
    return `This action updates a #${id} channelLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} channelLog`;
  }
}
