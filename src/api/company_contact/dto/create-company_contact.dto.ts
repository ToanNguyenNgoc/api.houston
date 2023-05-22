import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export class CreateCompanyContactDto {
  @ApiProperty()
  @IsIn(['TELEPHONE','EMAIL'])
  contact_type:string

  @ApiProperty()
  @IsNotEmpty()
  contact_info:string
}
