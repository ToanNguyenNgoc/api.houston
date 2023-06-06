import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, Matches } from "class-validator";
import { payKey } from "src/common";

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  branch_id: number

  @ApiProperty()
  customer_id: number

  @ApiProperty()
  employee_id: number

  @ApiProperty()
  @IsNotEmpty()
  villa_id: number

  @ApiProperty()
  @Matches(/^\d{4}-\d{2}-\d{2}/, { message: 'From date is must match YYYY-MM-DD' })
  from_date_booking: Date

  @ApiProperty()
  @Matches(/^\d{4}-\d{2}-\d{2}/, { message: 'To date is must match YYYY-MM-DD' })
  to_date_booking: Date

  @ApiProperty()
  @IsNotEmpty()
  customer_count: number

  @ApiProperty()
  baby_count: number

  @ApiProperty()
  note: string

}

export class CreateBookingCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  branch_id: number

  @ApiProperty()
  @IsNotEmpty()
  villa_id: number

  @ApiProperty()
  @Matches(/^\d{4}-\d{2}-\d{2}/, { message: 'From date is must match YYYY-MM-DD' })
  from_date_booking: Date

  @ApiProperty()
  @Matches(/^\d{4}-\d{2}-\d{2}/, { message: 'To date is must match YYYY-MM-DD' })
  to_date_booking: Date

  @ApiProperty()
  @IsNotEmpty()
  customer_count: number

  @ApiProperty()
  baby_count: number

  @ApiProperty()
  note: string

  @ApiProperty()
  @IsIn([payKey.CASH, payKey.VNPAY])
  payment_method:string;

  @ApiProperty()
  payment_method_bank:string;

  @ApiProperty()
  @IsNotEmpty()
  recaptcha:string
}
