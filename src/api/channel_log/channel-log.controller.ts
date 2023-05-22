import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { ChannelLogService } from './channel-log.service';
import { CreateChannelLogDto } from './dto/create-channel-log.dto';
import { UpdateChannelLogDto } from './dto/update-channel-log.dto';

@ApiSecurity('x-api-key')
@Controller('channel_logs')
@ApiTags('channel_logs')
export class ChannelLogController {
  constructor(private readonly channelLogService: ChannelLogService) { }

  @Post()
  @UseGuards(JwtSysGuard, RoleGuard)
  create(@Body() createChannelLogDto: CreateChannelLogDto) {
    return this.channelLogService.create(createChannelLogDto);
  }

  @Get()
  @UseGuards(JwtSysGuard, RoleGuard)
  findAll() {
    return this.channelLogService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtSysGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.channelLogService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtSysGuard, RoleGuard)
  update(@Param('id') id: string, @Body() updateChannelLogDto: UpdateChannelLogDto) {
    return this.channelLogService.update(+id, updateChannelLogDto);
  }

  @Delete(':id')
  @UseGuards(JwtSysGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.channelLogService.remove(+id);
  }
}
