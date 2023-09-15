import { QueryResult } from "pg";
import { Pessoa } from "../entities/pessoa.entity";
import db from "./database";
import {
    UnprocessableEntityException,
    NotFoundException
} from '@nestjs/common'

export class ClientDatabase {

    async create(pessoa: Pessoa): Promise<void> {

        try {
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
        } catch (err) {
            throw new UnprocessableEntityException(err.message);
        }

    }

    async getPessoa(id: string): Promise<Pessoa | null> {

        const { rows }: QueryResult<Pessoa> = await db.query(`
            SELECT * FROM pessoa WHERE id = '${id}';
            `);

        if (rows.length === 0) {
            throw new NotFoundException("Pessoa não encontrada");
        }

        const pessoa = new Pessoa(rows[0].apelido, rows[0].nome, rows[0].nascimento, [], rows[0].id);

        const { rows: stack }: QueryResult<{
            stack: string
        }> = await db.query(`
            SELECT stack FROM stack WHERE id_pessoa = '${id}';
        `);

        pessoa.setStack(stack.map((item: { stack: string }) => item.stack));

        return pessoa;

    }

    async getAllPessoas(): Promise<Pessoa[]> {

        console.log("SLA1")
        const { rows } = await db.query(`
            SELECT * FROM pessoa;
        `);

        const pessoas: Pessoa[] = [];

        for (let row of rows) {
            const pessoa = new Pessoa(row.apelido, row.nome, row.nascimento, [], rows[0].id);

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
            const t: string = termo.toLowerCase();
            const { nome, apelido, stack } = pessoa;

            if (
                nome.toLowerCase().includes(t) ||
                apelido.toLowerCase().includes(t) ||
                stack.join(' ').toLowerCase().includes(t)
            ) {
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