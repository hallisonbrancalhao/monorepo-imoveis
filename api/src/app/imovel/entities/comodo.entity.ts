import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Imovel } from './imovel.entity';

@Entity()
export class Comodo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Imovel, (imovel) => imovel.comodos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'imovel_id' })
  imovel: Imovel;
}
