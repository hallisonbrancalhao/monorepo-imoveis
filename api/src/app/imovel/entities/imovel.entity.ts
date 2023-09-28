import { IsString, IsNotEmpty, IsDate } from '@nestjs/class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comodo } from './comodo.entity';

@Entity()
export class Imovel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: 'A descricao deve ser uma string' })
  descricao: string;

  @Column()
  @IsDate({ message: 'A data da compra deve ser uma data' })
  dataCompra: Date;

  @Column()
  @IsString({ message: 'O endereco deve ser uma string' })
  endereco: string;

  @OneToMany(() => Comodo, (comodo) => comodo.imovel, {
    cascade: true,
    eager: false,
  })
  comodos: Comodo[];
}
