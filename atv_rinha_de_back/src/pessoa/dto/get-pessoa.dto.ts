import { ClientDatabase } from "../database/client.servise";
import { Pessoa } from "../entities/pessoa.entity";

export class GetPessoasDto {
    constructor(private readonly database: ClientDatabase) { }
    async getPessoas(): Promise<Pessoa[]> {
        const dados = await this.database.getAllPessoas();
        return dados;
    }

    async getPessoa(id: string): Promise<Pessoa | null> {
        const dados = await this.database.getPessoa(id);
        return dados;
    }

    async getContagem(): Promise<number> {
        const dados = await this.database.ContagemPessoas();
        return dados;
    }
}