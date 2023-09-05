import { Client, QueryResult } from 'pg'
import { Produto } from './app.service';
import { Response } from 'express';

const db = new Client({
    host: 'dpg-cjo8lcb6fquc73bbu70g-a.oregon-postgres.render.com',
    user: 'marcos',
    password: 'IIkndKuWR7iubyZRGlaUpbDV8HhbxGPm',
    port: 5432,
    database: 'projeto_rosa',
    ssl: {
        rejectUnauthorized: false
    }
});

(async () => {
    await db.connect()

    db.query(`
    CREATE TABLE IF NOT EXISTS produto (
        id VARCHAR PRIMARY KEY, nome VARCHAR(30) NOT NULL,
        status CHAR(1) NOT NULL,
        taxa_rentabilidade INTEGER NOT NULL,
        Prazo INTEGER NOT NULL,
        taxa_adm INTEGER NOT NULL,
        vencimento DATE NOT NULL,
        liquidez CHAR(1) NOT NULL
        );
    
    CREATE OR REPLACE FUNCTION ALTERAR_STATUS(id_prod varchar)
    RETURNS VOID AS $$
    BEGIN
    
    IF NOT EXISTS (SELECT * FROM PRODUTO WHERE id = id_prod) THEN
        RAISE EXCEPTION 'Produto não encontrado';
    END IF;

    IF EXISTS (SELECT * FROM PRODUTOS WHERE id = id_prod AND status = 'A') THEN
        UPDATE PRODUTOS
        SET STATUS = 'I'
        WHERE id = id_prod;
    ELSE
        UPDATE PRODUTOS
        SET STATUS = 'A'
        WHERE id = id_prod;
	END IF;

    END;
    $$
    LANGUAGE PLPGSQL;
        `, (err, res) => {
        if (err) throw err;
    });
})();

async function getProdutos(): Promise<Produto[]> {
    const res: QueryResult<any> = await db.query('SELECT * FROM produto;');
    const produtos: Produto[] = [];
    for (const row of res.rows) {
        const produto: Produto = new Produto(
            row.nome,
            row.taxa_rentabilidade,
            row.prazo,
            row.taxa_adm,
            row.vencimento,
            row.liquidez
        )
        if (row.status != produto.status[0]) {
            produto.alterarStatus();
        }
        produtos.push(produto);
    }
    return produtos;
}

const getProduto: (id: string) => Promise<Produto | null> = async (id: string) => {
    if (!id || id.length == 0) {
        return null;
    }
    const res = await db.query(`SELECT * FROM produto WHERE id = ${id};`);
    if (res.rows.length === 0) {
        return null;
    }
    const row = res.rows[0];
    const produto: Produto = new Produto(
        row.nome,
        row.taxa_rentabilidade,
        row.prazo,
        row.taxa_adm,
        row.vencimento,
        row.liquidez === 'S'
    )
    if (row.status != produto.status[0]) {
        produto.alterarStatus();
    }
    return produto;
}

const addProduto: (produto: Produto) => Promise<void> = async (produto: Produto) => {

    if (!produto) {
        throw new Error("Produto inválido!!");
    }
    try {
        await db.query(`INSERT INTO produto (nome, status, taxa_rentabilidade, prazo, taxa_adm, vencimento, liquidez)
    VALUES ('${produto.nome}', '${produto.status}', ${produto.taxa_rentabilidade}, ${produto.prazo}, ${produto.taxa_adm}, '${produto.vencimento}', ${produto.liquidez});`)
    } catch (e) {
        throw new Error(`Ocorreu um erro ao adicionar o produto\n=> ${e.message}`);
    }
}

const removeProduto: (id: string) => Promise<void> = async (id: string) => {
    try {
        await db.query(`DELETE FROM produto WHERE id = '${id}';`)
    } catch (e) {
        throw new Error(`Ocorreu um erro ao remover o produto\n=> ${e.message}`);
    }
}

const updateProduto: (id: string, produto: Produto) => Promise<void> = async (id: string, produto: Produto) => {
    await db.query(`UPDATE produto SET nome = '${produto.nome}', status = '${produto.status}', taxa_rentabilidade = ${produto.taxa_rentabilidade}, prazo = ${produto.prazo}, taxa_adm = ${produto.taxa_adm}, vencimento = '${produto.vencimento}', liquidez = ${produto.liquidez ? 'S' : 'N'} WHERE id = ${id};`)
        .catch(err => {
            throw new Error(`Ocorreu um erro ao atualizar o produto\n=> ${err.message}`);
        });

}

const mudar_status: (id: string, res: Response) => Promise<void> = async (id: string, res: Response) => {

    if (!id) {
        res.status(400).json({
            message: "Identificador inválido!!"
        })
    }

    try {
        db.query(`
            SELECT ALTERAR_STATUS('${id}')
        `)
        res.status(200).json({
            message: "Status alterado com sucesso!!"
        });
    } catch (e) {
        res.status(400).json({
            message: e.message ? e.message : "Erro ao alterar status!!"
        });
    }
}

export { getProdutos, getProduto, addProduto, removeProduto, updateProduto, mudar_status };

export default db;