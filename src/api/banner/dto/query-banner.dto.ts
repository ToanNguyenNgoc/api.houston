import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { BANNER_TYPE } from "./create-banner.dto";

export class QueryBannerDTO {
  @ApiProperty({ default: 1, required: false })
  page: number;

  @ApiProperty({ default: 15, required: false })
  limit: number;

  @ApiProperty({ required: false, enum: BANNER_TYPE })
  @IsIn([...BANNER_TYPE, null, undefined])
  type: string
}