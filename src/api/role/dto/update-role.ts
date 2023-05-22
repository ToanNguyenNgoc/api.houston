import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDTO {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly permissions: number[]

  @ApiProperty()
  status: boolean
}