import { Inject, Injectable } from '@nestjs/common';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';
import { Imovel } from './entities/imovel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImovelService {
  constructor(
    @Inject('IMOVEL_REPOSITORY')
    private imovelRepository: Repository<Imovel>
  ) {}

  async create(createImovelDto: CreateImovelDto): Promise<Imovel> {
    if (createImovelDto.comodos.length > 0) {
      createImovelDto.comodos.forEach((comodo) => {
        comodo.imovel = new Imovel();
      });
    }
    const imovel = this.imovelRepository.create(createImovelDto);
    return await this.imovelRepository.save(imovel);
  }

  async findAll() {
    return await this.imovelRepository.find();
  }

  async findOne(id: number) {
    return await this.imovelRepository.findOneBy({ id });
  }

  async update(id: number, updateImovelDto: UpdateImovelDto) {
    return await this.imovelRepository.update(id, updateImovelDto);
  }

  async remove(id: number) {
    return await this.imovelRepository.delete(id);
  }
}
