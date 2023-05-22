import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export const BANNER_TYPE = ['BRANCH', 'VILLA', 'WEB', 'HOME', 'VIDEO']
export class CreateBannerDto {
  @ApiProperty()
  @IsNotEmpty()
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
}
