import { ApiProperty } from "@nestjs/swagger";
import {  IsEmail, IsNotEmpty } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty()
  fullname: string

  @ApiProperty()
  @IsNotEmpty()
  telephone: string

  @ApiProperty()
  sex: boolean

  @ApiProperty()
  full_address: string

  @ApiProperty()
  country: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  dob: Date

  @ApiProperty()
  ccid: string

  @ApiProperty()
  job: string

  @ApiProperty()
  media_id: number

  @ApiProperty()
  customerOriginalId: number
}
