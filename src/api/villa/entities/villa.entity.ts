import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Media } from "../../media/entities";
import { VillaGallery } from "../../villa_gallery/entities";
import { Branch } from "../../branches/entities";
import { VillaCate } from "../../villa_cate/entities";
import { Booking } from "../../booking/entities";
import { VillaRoom } from "../../villa_room/entities";

@Entity('tb_villa')
export class Villa {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: true })
  name: string

  @OneToOne(() => Media)
  @JoinColumn()
  thumbnail: Media

  @OneToMany(() => VillaGallery, (villaGallery) => villaGallery.villa)
  galleries: VillaGallery[]


  @Column({ nullable: true, length:10000 })
  description: string

  @ManyToOne(() => Branch, (branch) => branch.villas)
  branch: Branch

  @ManyToOne(() => VillaCate, (villaCate) => villaCate.villas)
  villa_cate: VillaCate

  @Column({ nullable: true })
  price: number

  @Column({ nullable: true })
  special_price: number

  @Column({ nullable: true })
  holiday_price: number

  @Column({ nullable: true })
  weekend_price: number

  @Column({ default: true })
  status: boolean

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Booking, (booking) => booking.villa)
  bookings: Villa

  @Column({ nullable: true })
  acreage: number

  @ManyToOne(() => VillaRoom, (villaRoom) => villaRoom.villa)
  rooms: VillaRoom[]
}
