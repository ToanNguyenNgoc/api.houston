import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ForgotAuthCustomer{
  @ApiProperty()
  @IsEmail()
  email:string
  @ApiProperty()
  code:string
  @ApiProperty()
  new_password:string
  @ApiProperty()
  recaptcha:string;
}