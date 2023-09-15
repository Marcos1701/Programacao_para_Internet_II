import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pessoa } from './entities/pessoa.entity';

@Controller('')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) { }

  @ApiTags('rinha')
  @ApiResponse({
    status: 201,
    type: Pessoa,
    description: 'Retorna uma pessoa criada'
  })
  @ApiBody({
    required: true,
    type: CreatePessoaDto,
    description: 'Dados de uma pessoa'
  })
  @Post("pessoas")
  async create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoaService.create(createPessoaDto)
  }

  @ApiTags('rinha')
  @ApiResponse({
    status: 200,
    type: Pessoa,
    isArray: true,
    description: 'Retorna todas as pessoas ou uma lista de pessoas que correspondem ao termo de busca'
  })
  @ApiResponse({
    status: 400,
    description: 'O termo de busca não pode ser vazio'
  })
  @ApiQuery({
    name: 't',
    required: false,
    description: 'Termo de busca'
  })
  @Get("pessoas")
  async findAll_or_search(@Query('t') termo: string) {
    if (termo) {
      if (termo.length === 0) throw new BadRequestException("O termo de busca não pode ser vazio");
      return this.pessoaService.search(termo)
    }
    return this.pessoaService.findAll();
  }

  @ApiTags('rinha')
  @ApiResponse({
    status: 200,
    type: Pessoa,
    description: 'Retorna uma pessoa com o id especificado'
  })
  @Get('pessoas/:id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(id)
  }

  @ApiTags('rinha')
  @ApiResponse({
    status: 200,
    type: Number,
    description: 'Retorna a contagem de pessoas'
  })
  @Get("contagem-pessoas")
  getContagem() {
    return this.pessoaService.getContagem();
  }
}
