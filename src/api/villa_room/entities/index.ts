import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm'
import { Media } from '../../media/entities';
import { Villa } from '../../villa/entities';

@Entity({ name: 'tb_villa_room' })
export class VillaRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => Media, (media) => media)
  @JoinColumn()
  thumbnail: Media

  @ManyToOne(() => Villa, (villa) => villa.rooms)
  villa: Villa

  @Column({ default: true })
  status: boolean

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}