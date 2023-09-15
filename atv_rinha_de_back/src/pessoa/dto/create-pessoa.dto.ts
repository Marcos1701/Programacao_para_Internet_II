import { ClientDatabase } from "../database/client.servise";
import { Pessoa } from "../entities/pessoa.entity";


export interface CreatePessoaInterface {
    apelido: string,
    nome: string,
    nascimento: string,
    stack?: string[]
}

export class CreatePessoaDto {

    constructor(private readonly database: ClientDatabase) { }

    async create(apelido: string, nome: string, nascimento: string, stack?: string[]): Promise<Pessoa> {
        const pessoa = new Pessoa(apelido, nome, nascimento, stack);
        await this.database.create(pessoa);
        return pessoa;
    }
}
