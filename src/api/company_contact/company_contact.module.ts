import { Module } from '@nestjs/common';
import { CompanyContactService } from './company_contact.service';
import { CompanyContactController } from './company_contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyContact } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([CompanyContact])
  ],
  controllers: [CompanyContactController],
  providers: [CompanyContactService]
})
export class CompanyContactModule {}
