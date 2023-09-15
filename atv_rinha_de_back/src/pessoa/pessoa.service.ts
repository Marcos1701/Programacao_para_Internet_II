import { Injectable } from '@nestjs/common';
import { CreatePessoaDto, CreatePessoaInterface } from './dto/create-pessoa.dto';
import { SearchPessoaDto } from './dto/search-pessoa.dto';
import { GetPessoasDto } from './dto/get-pessoa.dto';

@Injectable()
export class PessoaService {

  constructor(
    private readonly getPessoasDto: GetPessoasDto,
    private readonly createPessoaDto: CreatePessoaDto,
    private readonly searchPessoaDto: SearchPessoaDto
  ) { }

  async create({ apelido, nome, nascimento, stack }: CreatePessoaInterface) {
    return await this.createPessoaDto.create(apelido, nome, nascimento, stack);
  }

  async findAll() {
    return await this.getPessoasDto.getPessoas();
  }

  async findOne(id: string) {
    return await this.getPessoasDto.getPessoa(id);
  }

  async search(termo: string) {
    return await this.searchPessoaDto.search(termo);
  }

  async getContagem(): Promise<number> {
    return await this.getPessoasDto.getContagem()
  }
}
