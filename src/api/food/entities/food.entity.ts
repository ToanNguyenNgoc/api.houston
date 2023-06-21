import { Branch } from 'src/api/branches/entities';
import { FoodCate } from 'src/api/food_cate/entities';
import { Media } from 'src/api/media/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn
} from 'typeorm'

@Entity({ name: 'tb_food' })
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @OneToOne(() => Media, (media) => media)
  @JoinColumn()
  media: Media

  @ManyToOne(() => FoodCate, (foodCate) => foodCate.foods)
  food_cate: FoodCate

  @ManyToOne(() => Branch, (branch) => branch.foods)
  branch: Branch

  @Column({ nullable: true, length: 500 })
  description: string;

  @Column({ default: true })
  status: boolean

  @Column({ default: false })
  deleted: boolean

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}
