import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne
} from 'typeorm'
import { Media } from '../../media/entities';

@Entity({ name: 'tb_banner' })
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  name:string;

  @OneToOne(() => Media)
  @JoinColumn()
  media: Media

  @Column({nullable:false})
  type:string;

  @Column({nullable:true})
  content:string;

  @Column({nullable:true})
  url:string;

  @Column({nullable:true})
  original_id:string;

  @Column({default:true})
  status:boolean;

  @Column({default:false})
  deleted:boolean;

  @UpdateDateColumn()
  updated_at:Date

  @CreateDateColumn()
  created_at:Date
}
