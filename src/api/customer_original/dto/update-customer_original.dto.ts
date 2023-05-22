import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateCustomerOriginalDto {
  @ApiProperty()
  name: string

  @ApiProperty({ nullable: true })
  @IsBoolean()
  status: boolean
}
