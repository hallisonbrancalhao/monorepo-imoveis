import { IsString, IsNotEmpty, IsDate } from '@nestjs/class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comodo } from './comodo.entity';

@Entity('imovel')
export class Imovel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  @IsString({ message: 'A descricao deve ser uma string' })
  @IsNotEmpty()
  descricao: string;

  @Column('datetime')
  @IsDate({ message: 'A data da compra deve ser uma data' })
  @IsNotEmpty()
  dataCompra: Date;

  @Column('varchar', { length: 255 })
  @IsString({ message: 'O endereco deve ser uma string' })
  @IsNotEmpty()
  endereco: string;

  @OneToMany(() => Comodo, (comodo) => comodo.imovel)
  comodos: Comodo[];
}
