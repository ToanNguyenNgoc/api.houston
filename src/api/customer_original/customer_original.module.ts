import { Module } from '@nestjs/common';
import { CustomerOriginalService } from './customer_original.service';
import { CustomerOriginalController } from './customer_original.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOriginal } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerOriginal])
  ],
  controllers: [
    CustomerOriginalController],
  providers: [CustomerOriginalService]
})
export class CustomerOriginalModule { }
