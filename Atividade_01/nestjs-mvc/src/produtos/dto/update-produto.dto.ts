import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProdutoDto } from './create-produto.dto';
import { ulid } from 'ulidx';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
    @ApiProperty()
    private _id: string;
    @ApiProperty()
    private _status: string;

    constructor(
        id: string,
        nome: string,
        status: string,
        taxa_rentabilidade: number,
        prazo: number,
        taxa_adm: number,
        vencimento: Date,
        liquidez: boolean
    ) {
        super(nome, taxa_rentabilidade, prazo, taxa_adm, vencimento, liquidez);
        this._id = id;
        this._status = status;
    }

    get id(): string {
        return this._id;
    }

    get status(): string {
        return this._status;
    }

}
