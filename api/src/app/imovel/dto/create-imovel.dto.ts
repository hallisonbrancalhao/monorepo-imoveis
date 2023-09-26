import { IsDate, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Comodo } from '../entities/comodo.entity';

export class CreateImovelDto {
  @ApiProperty()
  @IsString({ message: 'A descricao deve ser uma string' })
  @IsNotEmpty()
  descricao: string;

  @ApiProperty()
  @IsDate({ message: 'A data da compra deve ser uma data' })
  @IsNotEmpty()
  dataCompra: Date;

  @ApiProperty()
  @IsString({ message: 'O endereco deve ser uma string' })
  @IsNotEmpty()
  endereco: string;

  @ApiProperty({ type: [Comodo] })
  comodos: Comodo[];
}
