import { Branch } from '../../branches/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Role } from '../../role/entities'
import { Media } from '../../media/entities'
import { Booking } from '../../booking/entities';

@Entity({ name: 'tb_account' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telephone: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  sex: boolean

  @Column({ nullable: false })
  full_address: string

  @Column({ nullable: true })
  ccid: string;

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]

  @ManyToOne(() => Branch, (branch) => branch.accounts)
  branch: Branch

  @OneToOne(() => Media)
  @JoinColumn()
  media: Media

  @OneToMany(() => Booking, (booking) => booking.employee)
  bookings: Booking[]
}
