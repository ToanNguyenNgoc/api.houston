import { ApiProperty } from "@nestjs/swagger";

export class UpdateFoodCateDto {
  @ApiProperty()
  name:string;

  @ApiProperty()
  description:string;

  @ApiProperty()
  status:boolean
}
