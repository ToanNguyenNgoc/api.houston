import { Module } from '@nestjs/common';
import { CompanySocialService } from './company_social.service';
import { CompanySocialController } from './company_social.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySocial } from './entities';

@Module({
  imports:[TypeOrmModule.forFeature([CompanySocial])],
  controllers: [CompanySocialController],
  providers: [CompanySocialService]
})
export class CompanySocialModule {}
