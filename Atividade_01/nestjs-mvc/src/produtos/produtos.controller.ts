import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Patch(':id')
  alter(@Query('id') id: string, @Body() alterProduto: UpdateProdutoDto){
    if(!id){
      return "Id inválido"
    }
    return this.produtosService.update(id, alterProduto)
  }
  
}
