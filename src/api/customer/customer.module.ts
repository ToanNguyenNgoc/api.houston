import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { GeneratePermissionMiddleware } from '../../middlewares/generate-permission';
import { Permission } from '../permission/entities/permission.entity';
import { Account } from '../account/entities';
import { Role } from '../role/entities';
import { Media } from '../media/entities'
import { CustomerOriginal } from '../customer_original/entities';

@Module({
  imports: [TypeOrmModule.forFeature([
    Customer,
    Permission,
    Account,
    Role,
    Media,
    CustomerOriginal
  ])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GeneratePermissionMiddleware)
      .forRoutes(CustomerController);
  }
}
