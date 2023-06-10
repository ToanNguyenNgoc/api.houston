import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotAuthCustomer{
  @ApiProperty()
  @IsEmail()
  email:string
  @ApiProperty()
  code:string
  @ApiProperty()
  new_password:string
  @ApiProperty()
  @IsNotEmpty()
  recaptcha:string;
}