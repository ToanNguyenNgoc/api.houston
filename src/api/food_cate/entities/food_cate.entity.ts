import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column, OneToMany } from 'typeorm'
import { Branch } from 'src/api/branches/entities';
import { Food } from 'src/api/food/entities';

@Entity({ name: 'tb_food_cate' })
export class FoodCate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch, (branch) => branch.food_cates)
  branch: Branch

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, length: 4000 })
  description: string;

  @Column({ default: true })
  status: boolean;

  @Column({ default: false })
  deleted: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => Food, (food) => food.food_cate)
  foods: Food[]

}
