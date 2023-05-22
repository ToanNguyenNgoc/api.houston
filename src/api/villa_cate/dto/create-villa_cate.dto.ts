import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVillaCateDto {
  @ApiProperty()
  @IsString()
  villa_cate_name:string

  @ApiProperty()
  description:string

  @ApiProperty()
  media_id:number

  @ApiProperty()
  @IsNotEmpty()
  branch_id:number
}
