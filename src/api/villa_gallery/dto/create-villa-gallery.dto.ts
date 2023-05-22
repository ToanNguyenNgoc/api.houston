import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateVillaGalleryDTO{
  @ApiProperty()
  @IsNotEmpty()
  villa_id:number
  @ApiProperty()
  media_ids:number[]
}