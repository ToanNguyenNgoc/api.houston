import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChannelLogService } from './channel-log.service';
import { ChannelLogController } from './channel-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelLog } from './entities';
import { GeneratePermissionMiddleware } from '../../middlewares/generate-permission'
import { Permission } from '../permission/entities/permission.entity';
import { Account } from '../account/entities';
import { Role } from '../role/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelLog, Permission, Account, Role])],
  controllers: [ChannelLogController],
  providers: [ChannelLogService]
})
export class ChannelLogModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GeneratePermissionMiddleware)
      .forRoutes(ChannelLogController);
  }
}
