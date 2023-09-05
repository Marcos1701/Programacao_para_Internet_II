import { QueryResult } from "pg";
import { Produto } from '../entities/produto.entity';
import db from "./database";

interface ProdutoRow {
    id: string;
    nome: string;
    status: string;
    taxa_rentabilidade: number;
    prazo: number;
    taxa_adm: number;
    vencimento: Date;
    liquidez: string;
}

export class GetProdutos {
    async GetProdutos(): Promise<Produto[]> {
        const res: QueryResult<ProdutoRow> = await db.query('SELECT * FROM produto;');
        const produtos: Produto[] = [];
        for (const row of res.rows) {
            produtos.push(new Produto(
                row.nome,
                row.status,
                row.taxa_rentabilidade,
                row.prazo,
                row.taxa_adm,
                row.vencimento,
                row.liquidez === 'S'
            ));
        }
        return produtos;
    }

    async GetProduto(id: string): Promise<Produto | null> {
        if (!id || id.length == 0) {
            return null;
        }
        const res: QueryResult<ProdutoRow> = await db.query(`SELECT * FROM produto WHERE id = ${id};`);
        if (res.rows.length === 0) {
            return null;
        }
        const row: ProdutoRow = res.rows[0];
        const produto: Produto = new Produto(
            row.nome,
            row.status,
            row.taxa_rentabilidade,
            row.prazo,
            row.taxa_adm,
            row.vencimento,
            row.liquidez === 'S'
        )
        return produto;
    }
}