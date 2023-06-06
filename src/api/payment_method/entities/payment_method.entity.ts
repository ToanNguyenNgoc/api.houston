import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany
} from "typeorm"
import {Booking} from "../../booking/entities"

@Entity({ name: 'tb_payment_method' })
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  name_key: string;

  @Column({ nullable: true })
  name_children: string;

  @Column({ unique: true })
  name_children_key: string;

  @Column({ default: false })
  is_changeable: boolean;

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Booking, (booking) => booking.payment_method)
  bookings:Booking[]

}
