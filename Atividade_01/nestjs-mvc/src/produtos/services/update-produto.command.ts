import db from 'src/database';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { Produto } from '../entities/produto.entity';

export class UpdateProduto {
    UpdateProduto(produto: UpdateProdutoDto): Promise<UpdateProdutoDto> {

        return new Promise((resolve, reject) => {
            db.query(`UPDATE produto SET nome = '${produto.nome}', status = '${produto.status}', taxa_rentabilidade = ${produto.taxa_rentabilidade}, prazo = ${produto.prazo}, taxa_adm = ${produto.taxa_adm}, vencimento = '${produto.vencimento}', liquidez = ${produto.liquidez ? 'S' : 'N'} WHERE id = ${produto.id};`)
                .then(res => {
                    resolve(produto);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}