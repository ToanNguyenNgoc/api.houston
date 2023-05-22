import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBranchDto {
  @ApiProperty()
  @IsNotEmpty()
  name:string

  @ApiProperty()
  @IsNotEmpty()
  media_id:number

  @ApiProperty()
  content:string

  @ApiProperty()
  description:string

  @ApiProperty()
  @IsNotEmpty()
  address:string

  @ApiProperty()
  @IsNotEmpty()
  province_code:number

  @ApiProperty()
  @IsNotEmpty()
  district_code:number

  @ApiProperty()
  @IsNotEmpty()
  ward_code:number

  @ApiProperty()
  lat:string

  @ApiProperty()
  lng:string
}
