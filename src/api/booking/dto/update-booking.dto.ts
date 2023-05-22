import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsIn } from 'class-validator';

export class UpdateBookingDto {
  @ApiProperty()
  @IsIn(['PENDING', 'CANCEL', 'SUCCESS'])
  booking_status: string

  @ApiProperty()
  note: string
}
