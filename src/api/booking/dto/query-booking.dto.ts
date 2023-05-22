import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

class QueryBase {
  @ApiProperty({ required: false })
  page: string

  @ApiProperty({ required: false })
  limit: string

  @ApiProperty({ required: false, enum: ['PENDING', 'CANCEL', 'SUCCESS'] })
  @IsIn(['PENDING', 'CANCEL', 'SUCCESS', null, undefined])
  status_booking: string

  @ApiProperty({required:false, description:'full_address|villa_media'})
  includes:string
}

export class QueryBookingCustomer extends QueryBase {

}

export class QueryBooking extends QueryBase {
  @ApiProperty({ required: false })
  branch_id: number

  @ApiProperty({required:false, enum:['MANAGER','WEB_CLIENT']})
  @IsIn(['MANAGER', 'WEB_CLIENT', null, undefined])
  booking_platform:string

  @ApiProperty({ required: false })
  min_amount: number

  @ApiProperty({ required: false })
  max_amount: number

  @ApiProperty({ required: false, description: 'Support fullname, email, telephone customer' })
  filter_customer: string
}