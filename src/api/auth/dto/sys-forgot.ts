import { ApiProperty } from "@nestjs/swagger";

export class SysForgot {
  @ApiProperty({ nullable: false })
  email: string

  @ApiProperty()
  code: string

  @ApiProperty()
  new_password: string
}