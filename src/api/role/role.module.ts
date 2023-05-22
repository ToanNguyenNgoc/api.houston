import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities';
import { Permission } from '../permission/entities/permission.entity';
import {GeneratePermissionMiddleware} from '../../middlewares/generate-permission'
import { Account } from '../account/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, Account])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(GeneratePermissionMiddleware)
        .forRoutes(RoleController);
    }
}
