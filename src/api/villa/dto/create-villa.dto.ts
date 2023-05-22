import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVillaDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  media_id: number

  @ApiProperty()
  @IsNotEmpty()
  branch_id: number

  @ApiProperty()
  @IsNotEmpty()
  villa_cate_id: number

  @ApiProperty()
  description: string

  @ApiProperty()
  @IsNumber()
  price: number

  @ApiProperty()
  special_price: number

  @ApiProperty()
  weekend_price:number

  @ApiProperty()
  holiday_price:number

  @ApiProperty()
  acreage:number
}
