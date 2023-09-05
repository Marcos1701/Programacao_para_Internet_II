import db from 'src/database';
import { CreateProdutoDto } from '../dto/create-produto.dto'
import { Produto } from '../entities/produto.entity';

export class CreateProduto {

    async CreateProduto(produto: CreateProdutoDto): Promise<Produto> {
        const produtoEntity: Produto = new Produto(
            produto.nome,
            produto.destinacao,
            produto.taxa_rentabilidade,
            produto.prazo,
            produto.taxa_adm,
            produto.vencimento,
            produto.liquidez
        );
        await db.query(`INSERT INTO produto (id, nome, status, taxa_rentabilidade, prazo, taxa_adm, vencimento, liquidez)
        VALUES ('${produtoEntity.id}', '${produtoEntity.nome}', '${produtoEntity.status}', ${produtoEntity.taxa_rentabilidade}, ${produtoEntity.prazo}, ${produtoEntity.taxa_adm}, '${produtoEntity.vencimento}', ${produtoEntity.liquidez});`)
            .catch(err => {
                throw err;
            });
        return produtoEntity;
    }
}