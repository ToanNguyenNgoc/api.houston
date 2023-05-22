import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterAuthCustomerDTO {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  // @IsNotEmpty()
  password: string

  @ApiProperty()
  // @IsNotEmpty()
  fullname: string

  @ApiProperty()
  // @IsNotEmpty()
  telephone: string

  @ApiProperty()
  full_address: string

  @ApiProperty()
  dob: Date

  @ApiProperty()
  country: string

  @ApiProperty()
  code: string

}