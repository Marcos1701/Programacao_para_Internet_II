import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto, CreatePessoaInterface } from './dto/create-pessoa.dto';

@Controller('')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) { }

  @Post("pessoas")
  create(@Body() createPessoaDto: CreatePessoaInterface) {
    return this.pessoaService.create(createPessoaDto);
  }

  @Get("pessoas")
  findAll() {
    return this.pessoaService.findAll();
  }

  @Get('pessoas/:id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(id);
  }

  @Get("pessoas?t=:termo")
  search(@Param('termo') termo: string) {
    return this.pessoaService.search(termo);
  }

  @Get("contagem-pessoas")
  getContagem() {
    return this.pessoaService.getContagem();
  }
}
