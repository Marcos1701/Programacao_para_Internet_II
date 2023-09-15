import { Controller, Get, Post, Body, Param, Query, } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';

@Controller('')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) { }

  @Post("pessoas")
  async create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoaService.create(createPessoaDto)
  }

  @Get("pessoas")
  async findAll_or_search(@Query('t') termo: string) {
    if (termo) {
      // if (termo.length === 0) throw new Bad_Request_Error("O termo de busca não pode ser vazio");
      return this.pessoaService.search(termo)
    }
    return this.pessoaService.findAll();
  }

  @Get('pessoas/:id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(id)
  }

  @Get("contagem-pessoas")
  getContagem() {
    return this.pessoaService.getContagem();
  }
}
