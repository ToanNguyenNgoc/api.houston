import { ApiProperty } from "@nestjs/swagger";

export class QrCateFoodDTO {
  @ApiProperty({ required: false, default: 1 })
  page: number;

  @ApiProperty({ required: false, default: 15 })
  limit: number;

  @ApiProperty({ required: false })
  branch_id: number;

  @ApiProperty({ required: false })
  status: boolean
}