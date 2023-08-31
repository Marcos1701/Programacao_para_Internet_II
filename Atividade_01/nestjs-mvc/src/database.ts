import { Client } from 'pg'
import { Produto } from './app.service';

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
    CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY, nome VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL,
        taxa_rentabilidade INTEGER NOT NULL, prazo INTEGER NOT NULL, taxa_adm INTEGER NOT NULL,
        vencimento DATE NOT NULL, liquidez BOOLEAN NOT NULL
        );`, (err, res) => {
        if (err) throw err;
    });
})();

const getProdutos = async () => {
    const res = await db.query('SELECT * FROM produtos;');
    const produtos: Produto[] = [];
    for (const row of res.rows) {
        produtos.push(new Produto(
            row.nome,
            row.status,
            row.taxa_rentabilidade,
            row.prazo,
            row.taxa_adm,
            row.vencimento,
            row.liquidez
        ));
    }
    return res.rows;
}

const addProduto = async (produto: Produto) => {
    const res = await db.query(`INSERT INTO produtos (nome, status, taxa_rentabilidade, prazo, taxa_adm, vencimento, liquidez)
    VALUES ('${produto.nome}', '${produto.status}', ${produto.taxa_rentabilidade}, ${produto.prazo}, ${produto.taxa_adm}, '${produto.vencimento}', ${produto.liquidez});`).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

const removeProduto = async (id: string) => {
    const res = await db.query(`DELETE FROM produtos WHERE id = ${id};`).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

const updateProduto = async (id: string, produto: Produto) => {
    const res = await db.query(`UPDATE produtos SET nome = '${produto.nome}', status = '${produto.status}', taxa_rentabilidade = ${produto.taxa_rentabilidade}, prazo = ${produto.prazo}, taxa_adm = ${produto.taxa_adm}, vencimento = '${produto.vencimento}', liquidez = ${produto.liquidez} WHERE id = ${id};`).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

export { getProdutos, addProduto, removeProduto, updateProduto };

export default db;