import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  contacts: number[]

  @ApiProperty()
  socials: number[]
}
