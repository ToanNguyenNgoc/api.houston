import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { UploadsController } from './uploads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media])
  ],
  controllers: [MediaController, UploadsController],
  providers: [MediaService]
})
export class MediaModule { }
