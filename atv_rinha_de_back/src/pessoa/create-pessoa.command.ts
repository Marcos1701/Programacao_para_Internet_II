import db from "./dto/database";
import { Pessoa } from "./entities/pessoa.entity";

export class createpessoaCommand {

    async create(apelido: string, nome: string, nascimento: string, stack?: string[]) {
        stack?.forEach((item: string) => {
            if (!isNaN(parseInt(item)) || item.length > 32) {
                throw new Error('Stack inválida');
            }
        });

        const pessoa = new Pessoa(apelido, nome, nascimento);
        const query_add = `INSERT INTO pessoa (id, apelido, nome, nascimento) VALUES ($1, $2, $3, $4)`;
        const query_stack = `INSERT INTO stack (id_pessoa, stack) VALUES ($1, $2)`;
        const values = [pessoa.id, pessoa.apelido, pessoa.nome, pessoa.nascimento];
        await db.query(query_add, values);
        if (stack) {
            pessoa.setStack(stack);
            stack.forEach(async (item: string) => {
                await db.query(query_stack, [pessoa.id, item]);
            });
        }

        return pessoa;
    }
}