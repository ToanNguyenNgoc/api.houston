import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities';
import { Role } from '../role/entities';
import { GeneratePermissionMiddleware } from '../../middlewares/generate-permission';
import { Permission } from '../permission/entities/permission.entity';
import { Branch } from '../branches/entities';
import { Media } from '../media/entities';

@Module({
  imports: [TypeOrmModule.forFeature([
    Account,
    Role,
    Permission,
    Branch,
    Media
  ])],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GeneratePermissionMiddleware)
      .forRoutes(AccountController);
  }
}
