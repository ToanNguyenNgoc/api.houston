import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class QueryVillaGalleryDTO {

  @ApiProperty({ required: false })
  page: number

  @ApiProperty({ required: false })
  limit: number

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  villa_id: number
}