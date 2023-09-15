import { ClientDatabase } from "../database/client.servise";
import { Pessoa } from "../entities/pessoa.entity";

export class SearchPessoaDto {

    constructor(private readonly database: ClientDatabase) { }
    async search(termo: string): Promise<Pessoa[]> {
        const dados = await this.database.search(termo);
        return dados;
    }
}