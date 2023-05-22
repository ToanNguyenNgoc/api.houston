import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Media } from '../../media/entities'
import { CustomerOriginal } from '../../customer_original/entities'
import { Booking } from '../../booking/entities'

@Entity({ name: 'tb_customer' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  fullname: string

  @OneToOne(() => Media)
  @JoinColumn()
  avatar: Media

  @Column({ nullable: true })
  telephone: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: true })
  password: string

  @Column({ default: true })
  sex: boolean

  @Column({ nullable: true })
  dob: Date

  @Column({ nullable: true })
  ccid: string

  @Column({ nullable: true })
  job: string

  @Column({ nullable: true })
  full_address: string

  @Column({ nullable: true })
  country: string

  @Column({ default: true })
  status: boolean

  @Column({ default: false })
  deleted: boolean

  @ManyToOne(() => CustomerOriginal, (customer_original) => customer_original.customers)
  customer_original: CustomerOriginal

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings: Booking[]

  @Column()
  email_transfer: string
}
