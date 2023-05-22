import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { Media } from '../../media/entities'
import { Branch } from '../../branches/entities'
import { Villa } from '../../villa/entities'

@Entity('tb_villa_cate')
export class VillaCate {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  villa_cate_name: string
  
  @Column({nullable:true})
  description:string

  @OneToOne(() => Media, (media) => media)
  @JoinColumn()
  villa_cate_image:Media

  @ManyToOne(() => Branch, (branch) => branch.villa_cates)
  branch:Branch

  @Column({ default: true })
  status: boolean

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Villa,(villa) => villa.villa_cate)
  villas:Villa[]

}
