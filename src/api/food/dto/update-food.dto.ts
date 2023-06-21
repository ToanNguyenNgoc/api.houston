import { ApiProperty } from '@nestjs/swagger';

export class UpdateFoodDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  food_cate_id: number;

  @ApiProperty()
  media: number;

  @ApiProperty()
  status: boolean
}
