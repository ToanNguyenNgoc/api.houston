import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAccountDto {
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsNotEmpty()
  @ApiProperty()
  ccid:string

  @IsNotEmpty()
  @ApiProperty()
  telephone: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string

  @ApiProperty()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  full_address: string

  @ApiProperty()
  @IsNotEmpty()
  sex: boolean

  @ApiProperty()
  roles: number[]

  @ApiProperty()
  branch_id: number
}