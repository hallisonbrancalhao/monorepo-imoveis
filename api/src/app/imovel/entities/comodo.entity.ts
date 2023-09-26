import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Imovel } from './imovel.entity'; // importe o seu arquivo de entidade de Imovel

@Entity('comodo')
export class Comodo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @ManyToOne(() => Imovel, (imovel) => imovel.comodos)
  imovel: Imovel;
}
