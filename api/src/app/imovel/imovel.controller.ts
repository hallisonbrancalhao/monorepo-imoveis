import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImovelService } from './imovel.service';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('imovel')
export class ImovelController {
  constructor(private readonly imovelService: ImovelService) {}

  @ApiOperation({ summary: 'Cria um novo imóvel' })
  @ApiResponse({ status: 201, description: 'Imóvel criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({ type: CreateImovelDto, description: 'Dados do imóvel' })
  @Post()
  create(@Body() createImovelDto: CreateImovelDto) {
    return this.imovelService.create(createImovelDto);
  }

  @ApiOperation({ summary: 'Lista todos os imóveis' })
  @ApiResponse({ status: 200, description: 'Imóveis listados com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Get()
  findAll() {
    return this.imovelService.findAll();
  }

  @ApiOperation({ summary: 'Busca um imóvel pelo ID' })
  @ApiResponse({ status: 200, description: 'Imóvel encontrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'ID do imóvel' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imovelService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza um imóvel pelo ID' })
  @ApiResponse({ status: 200, description: 'Imóvel atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'ID do imóvel' })
  @ApiBody({ type: UpdateImovelDto, description: 'Dados do imóvel' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImovelDto: UpdateImovelDto) {
    return this.imovelService.update(+id, updateImovelDto);
  }

  @ApiOperation({ summary: 'Remove um imóvel pelo ID' })
  @ApiResponse({ status: 200, description: 'Imóvel deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'ID do imóvel' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imovelService.remove(+id);
  }
}
