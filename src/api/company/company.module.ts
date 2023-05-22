import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities';
import { CompanySocial } from '../company_social/entities';
import { Media } from '../media/entities';
import { CompanyContact } from '../company_contact/entities';

@Module({
  imports:[TypeOrmModule.forFeature([
    Company,
    CompanySocial,
    Media,
    CompanyContact
  ])],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
