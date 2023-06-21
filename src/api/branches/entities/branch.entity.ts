import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { Media } from '../../media/entities';
import { Account } from '../../account/entities';
import { VillaCate } from '../../villa_cate/entities';
import { Villa } from '../../villa/entities';
import { District, Province, Ward } from '../../province/entities';
import { Booking } from '../../booking/entities';
import { FoodCate } from 'src/api/food_cate/entities';
import { Food } from 'src/api/food/entities';

@Entity({ name: 'tb_branch' })
export class Branch {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToOne(() => Media, (media) => media)
  @JoinColumn()
  image: Media

  @Column({ nullable: true, length: 1000 })
  content: string;

  @Column({ nullable: true, length: 9500 })
  description: string;

  @Column({ default: true })
  status: boolean

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Account, (account) => account.branch)
  accounts: Account[]

  @OneToMany(() => VillaCate, (villa_cate) => villa_cate.branch)
  villa_cates: VillaCate[]

  @OneToMany(() => Villa, (villa) => villa.branch)
  villas: Villa

  @Column({ nullable: true })
  address: string

  @ManyToOne(() => Province, (province) => province.branches)
  province: Province

  @ManyToOne(() => District, (district) => district.branches)
  district: District

  @ManyToOne(() => Ward, (ward) => ward.branches)
  ward: Ward

  @Column({ nullable: true })
  latitude: string

  @Column({ nullable: true })
  longitude: string

  @OneToMany(() => Booking, (booking) => booking.branch)
  bookings: Booking[]

  @OneToMany(() => FoodCate, (foodCate) => foodCate.branch)
  food_cates: FoodCate[]

  @OneToMany(() => Food, (food) => food.branch)
  foods: Food[]
}
