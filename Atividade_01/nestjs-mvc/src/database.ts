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
        id VARCHAR PRIMARY KEY, nome VARCHAR(30) NOT NULL, status CHAR(1) NOT NULL,
        taxa_rentabilidade INTEGER NOT NULL, prazo INTEGER NOT NULL, taxa_adm INTEGER NOT NULL,
        vencimento DATE NOT NULL, liquidez BOOLEAN NOT NULL
        );
    
    CREATE OR REPLACE FUNCTION ALTERAR_STATUS(id_prod: varchar)
    RETURNS VOID AS $$
    BEGIN
    
    IF NOT EXISTS (SELECT * FROM PRODUTOS WHERE id = id_prod) THEN
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

    END;
    $$
    LANGUAGE PLPGSQL;
        `, (err, res) => {
        if (err) throw err;
    });
})();

const getProdutos: Promise<Produto[]> = async () => {
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
    return produtos;
}

const getProduto: Promise<Produto[] | null> = async (id: string) => {
    if(!id || id.length == 0){
        return null;
    }
    const res = await db.query(`SELECT * FROM produtos WHERE id = ${id};`);
    if(res.rows.length === 0){
        return null;
    }
    const row = res.rows[0];
    const produtos: Produto = new Produto(
        row.nome,
        row.status,
        row.taxa_rentabilidade,
        row.prazo,
        row.taxa_adm,
        row.vencimento,
        row.liquidez
    )
    return produtos;
}

const addProduto: Promise<void> = async (produto: Produto) => {
    const res = await db.query(`INSERT INTO produtos (nome, status, taxa_rentabilidade, prazo, taxa_adm, vencimento, liquidez)
    VALUES ('${produto.nome}', '${produto.status}', ${produto.taxa_rentabilidade}, ${produto.prazo}, ${produto.taxa_adm}, '${produto.vencimento}', ${produto.liquidez});`).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

const removeProduto: Promise<void> = async (id: string) => {
    const res = await db.query(`DELETE FROM produtos WHERE id = ${id};`).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

const updateProduto: Promise<void> = async (id: string, produto: Produto) => {
    const res = await db.query(`UPDATE produtos SET nome = '${produto.nome}', status = '${produto.status}', taxa_rentabilidade = ${produto.taxa_rentabilidade}, prazo = ${produto.prazo}, taxa_adm = ${produto.taxa_adm}, vencimento = '${produto.vencimento}', liquidez = ${produto.liquidez} WHERE id = ${id};`).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });

}

const mudar_status = async (id: string) => {

    
    
}

export { getProdutos, getProduto, addProduto, removeProduto, updateProduto };

export default db;