import { ApiProperty } from "@nestjs/swagger";

export class UpdateRoomDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  media_id: string;

  @ApiProperty()
  villa_id: string

  @ApiProperty()
  status: boolean
}