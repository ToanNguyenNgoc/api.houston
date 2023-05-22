import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "../../media/entities";
import { Villa } from "../../villa/entities";

@Entity({name:'tb_villa_gallery'})
export class VillaGallery {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Media)
  @JoinColumn()
  image: Media

  @ManyToOne(() => Villa,(villa) => villa.galleries)
  villa:Villa
}