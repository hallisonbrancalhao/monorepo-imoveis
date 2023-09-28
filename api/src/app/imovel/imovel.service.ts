import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';
import { Imovel } from './entities/imovel.entity';
import { Repository } from 'typeorm';
import { Comodo } from './entities/comodo.entity';

@Injectable()
export class ImovelService {
  constructor(
    @Inject('IMOVEL_REPOSITORY')
    private imovelRepository: Repository<Imovel>,
    @Inject('COMODO_REPOSITORY')
    private comodoRepository: Repository<Comodo>
  ) {}

  async create(createImovelDto: CreateImovelDto): Promise<Imovel> {
    const { descricao, dataCompra, endereco, comodos } = createImovelDto;

    const newImovel = this.imovelRepository.create({
      descricao,
      dataCompra,
      endereco,
    });

    const savedImovel = await this.imovelRepository.save(newImovel);
    const newComodos = this.comodoRepository.create(
      comodos.map((comodoDto) => ({
        ...comodoDto,
        imovel: savedImovel,
      }))
    );

    savedImovel.comodos = await this.comodoRepository.save(newComodos);
    return savedImovel;
  }

  async findAll(): Promise<Imovel[]> {
    return await this.imovelRepository.find({ relations: ['comodos'] });
  }

  async findOne(id: number): Promise<Imovel> {
    return await this.imovelRepository.findOne({
      where: { id },
      relations: ['comodos'],
    });
  }

  async update(id: number, updateImovelDto: UpdateImovelDto) {
    const imovel = await this.imovelRepository.findOne({
      where: { id },
      relations: ['comodos'],
    });

    if (!imovel) {
      throw new NotFoundException('Imóvel não encontrado');
    }

    imovel.descricao = updateImovelDto.descricao;
    imovel.dataCompra = updateImovelDto.dataCompra;
    imovel.endereco = updateImovelDto.endereco;
    imovel.comodos = updateImovelDto.comodos;

    return await this.imovelRepository.save(imovel);
  }
  async remove(id: number) {
    return await this.imovelRepository.delete(id);
  }
}
