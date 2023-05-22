import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm'
import { Customer } from '../../customer/entities'
import { Account } from '../../account/entities'
import { Villa } from '../../villa/entities'
import { Branch } from '../../branches/entities'

@Entity({ name: 'tb_booking' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Customer, (customer) => customer.bookings)
  customer: Customer

  @Column({ nullable: true })
  note: string

  @ManyToOne(() => Account, (account) => account.bookings)
  employee: Account

  @ManyToOne(() => Account, (account) => account.bookings)
  employee_update: Account

  @ManyToOne(() => Villa, (villa) => villa.bookings)
  villa: Villa

  @ManyToOne(() => Branch, (branch) => branch.bookings)
  branch: Branch

  @Column({ nullable: true })
  from_date_booking: Date

  @Column({ nullable: true })
  to_date_booking: Date

  @Column({ nullable: false })
  nights: number

  @Column({ nullable: false })
  customer_count: number

  @Column({ nullable: false })
  baby_count: number

  @Column({ default: 'PENDING' })
  status_booking: string

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column()
  amount: number

  @Column({ default: 'MANAGER' })
  booking_platform: string
}
