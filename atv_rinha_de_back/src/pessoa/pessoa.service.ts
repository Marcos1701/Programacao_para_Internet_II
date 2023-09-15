import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { ClientDatabase } from './database/client.servise';
import { Pessoa } from './entities/pessoa.entity';

@Injectable()
export class PessoaService {

  constructor(private readonly database: ClientDatabase) { }

  async create({ apelido, nome, nascimento, stack }: CreatePessoaDto): Promise<Pessoa> {
    if (!apelido || !nome || !nascimento) throw new BadRequestException("Os campos apelido, nome e nascimento são obrigatórios")
    const pessoa = new Pessoa(apelido, nome, nascimento, stack != undefined ? stack : []);
    await this.database.create(pessoa);
    return pessoa;
  }

  async findAll(): Promise<Pessoa[]> {
    const dados: Pessoa[] = await this.database.getAllPessoas();
    return dados;
  }

  async findOne(id: string): Promise<Pessoa | null> {
    const dados: Pessoa = await this.database.getPessoa(id);
    return dados;
  }

  async search(termo: string): Promise<Pessoa[]> {
    if (!termo || termo.length === 0) {
      throw new BadRequestException("O termo de busca não pode ser vazio");
    }
    const dados = await this.database.search(termo);
    return dados;
  }

  async getContagem(): Promise<number> {
    const dados = await this.database.ContagemPessoas();
    return dados;
  }
}


/* 
DTO - Data Transfer Object
Esse padrão é utilizado para transferir dados entre subsistemas de um software.

Service - Camada de Serviço
Essa camada é responsável por implementar as regras de negócio de um software.

Entity - Entidade
É um objeto que representa uma tabela do banco de dados.

Repository - Camada de Repositório
Essa camada é responsável por realizar as operações de CRUD no banco de dados.

Controller - Camada de Controle
Essa camada é responsável por receber as requisições HTTP e retornar as respostas HTTP.

Database - Camada de Banco de Dados
Essa camada é responsável por realizar a conexão com o banco de dados.
*/