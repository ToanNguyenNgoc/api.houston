import { ApiProperty } from '@nestjs/swagger';
import { BANNER_TYPE } from './create-banner.dto';
import { IsIn } from 'class-validator';

export class UpdateBannerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  media_id: number;

  @ApiProperty({ default: 'HOME' })
  @IsIn(BANNER_TYPE)
  type: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  original_id: string;

  @ApiProperty()
  status: boolean
}
