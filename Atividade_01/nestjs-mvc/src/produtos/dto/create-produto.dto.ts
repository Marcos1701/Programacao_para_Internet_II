import { ApiProperty } from "@nestjs/swagger";

export class CreateProdutoDto {
    @ApiProperty({description: "Nome do Produto"})
    nome: string

    @ApiProperty()
    destinacao: string

    @ApiProperty()
    taxa_rentabilidade: number;

    @ApiProperty()
    prazo: number;

    @ApiProperty()
    taxa_adm: number;

    @ApiProperty()
    vencimento: Date;

    @ApiProperty()
    liquidez: boolean;

    constructor(
        nome: string,
        destinacao:string,
        taxa_rentabilidade: number,
        prazo: number,
        taxa_adm: number,
        vencimento: Date,
        liquidez: boolean
      ) {

        this.nome = nome;
        this.destinacao = destinacao;
        this.taxa_rentabilidade = taxa_rentabilidade;
        this.prazo = prazo;
        this.taxa_adm = taxa_adm;
        this.vencimento = vencimento;
        this.liquidez = liquidez;
    }
    
}
