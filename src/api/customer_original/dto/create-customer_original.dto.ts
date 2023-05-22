import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCustomerOriginalDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string
}
