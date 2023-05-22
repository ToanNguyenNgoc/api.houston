import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { GeneratePermissionMiddleware } from '../../middlewares/generate-permission';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GeneratePermissionMiddleware)
      .forRoutes(PermissionController);
  }
}
