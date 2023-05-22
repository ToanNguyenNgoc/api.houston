import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelLogDto } from './create-channel-log.dto';

export class UpdateChannelLogDto extends PartialType(CreateChannelLogDto) {}
