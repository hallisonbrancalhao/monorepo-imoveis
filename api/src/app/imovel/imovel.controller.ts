import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ImovelService } from './imovel.service';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Imovel } from './entities/imovel.entity';

@Controller('imovel')
export class ImovelController {
  constructor(private readonly imovelService: ImovelService) {}

  @ApiOperation({ summary: 'Cria um novo imóvel' })
  @ApiResponse({ status: 201, description: 'Imóvel criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({ type: CreateImovelDto, description: 'Dados do imóvel' })
  @Post()
  create(@Body() createImovelDto: CreateImovelDto) {
    try {
      return this.imovelService.create(createImovelDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_IMPLEMENTED,
          error: 'Não foi possivel criar o imovel.',
          message: error.message,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  @ApiOperation({ summary: 'Lista todos os imóveis' })
  @ApiResponse({ status: 200, description: 'Imóveis listados com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Get()
  async findAll(): Promise<Imovel[]> {
    try {
      return await this.imovelService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Nenhum imóvel encontrado.',
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  @ApiOperation({ summary: 'Busca um imóvel pelo ID' })
  @ApiResponse({ status: 200, description: 'Imóvel encontrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'ID do imóvel' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.imovelService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Imóvel não encontrado.',
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  @ApiOperation({ summary: 'Atualiza um imóvel pelo ID' })
  @ApiResponse({ status: 200, description: 'Imóvel atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'ID do imóvel' })
  @ApiBody({ type: UpdateImovelDto, description: 'Dados do imóvel' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateImovelDto: UpdateImovelDto) {
    try {
      return this.imovelService.update(+id, updateImovelDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_MODIFIED,
          error: 'Não foi possível alterar o imóvel.',
        },
        HttpStatus.NOT_MODIFIED
      );
    }
  }

  @ApiOperation({ summary: 'Remove um imóvel pelo ID' })
  @ApiResponse({ status: 200, description: 'Imóvel deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'ID do imóvel' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.imovelService.remove(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Não foi possível excluir o imóvel.',
        },
        HttpStatus.NOT_FOUND
      );
    }
  }
}
