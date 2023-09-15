import { QueryResult } from "pg";
import { Pessoa } from "../entities/pessoa.entity";
import db from "./database";

export class ClientDatabase {
    constructor() {
        db.connect().catch((err) => console.log(err));
    }

    async create(pessoa: Pessoa): Promise<void> {
        await db.query(`
            INSERT INTO pessoa (id, apelido, nome, nascimento)
            VALUES ('${pessoa.id}', '${pessoa.apelido}', '${pessoa.nome}', '${pessoa.nascimento}');
        `);

        if (pessoa.stack.length > 0) {
            await db.query(`
                INSERT INTO stack (id_pessoa, stack)
                VALUES ${pessoa.stack.map((item: string) => `('${pessoa.id}', '${item}')`).join(', ')}
            `);
        }

    }

    async getPessoa(id: string): Promise<Pessoa | null> {
        const { rows } = await db.query(`
            SELECT * FROM pessoa WHERE id = '${id}';
        `);

        if (rows.length === 0) {
            return null;
        }

        const pessoa = new Pessoa(rows[0].apelido, rows[0].nome, rows[0].nascimento);

        const { rows: stack } = await db.query(`
            SELECT stack FROM stack WHERE id_pessoa = '${id}';
        `);

        pessoa.setStack(stack.map((item: { stack: string }) => item.stack));

        return pessoa;
    }

    async getAllPessoas(): Promise<Pessoa[]> {
        const { rows } = await db.query(`
            SELECT * FROM pessoa;
        `);

        const pessoas: Pessoa[] = [];

        for (let row of rows) {
            const pessoa = new Pessoa(row.apelido, row.nome, row.nascimento);

            const { rows: stack } = await db.query(`
                SELECT stack FROM stack WHERE id_pessoa = '${row.id}';
            `);

            pessoa.setStack(stack.map((item: { stack: string }) => item.stack));

            pessoas.push(pessoa);
        }

        return pessoas;
    }

    async search(termo: string): Promise<Pessoa[]> {
        const pessoas: Pessoa[] = await this.getAllPessoas();
        const pessoasEncontradas: Pessoa[] = [];

        pessoas.forEach((pessoa: Pessoa) => {
            if (pessoa.nome.includes(termo) || pessoa.apelido.includes(termo) || pessoa.stack.forEach((item: string) => item.includes(termo))) {
                pessoasEncontradas.push(pessoa);
            }
        });

        return pessoasEncontradas;
    }

    async ContagemPessoas(): Promise<number> {
        const result: QueryResult<{ count: number }> = await db.query(`
            SELECT COUNT(*) FROM pessoa;
        `);

        return result.rows[0].count;
    }
}