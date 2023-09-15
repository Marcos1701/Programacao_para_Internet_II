import { ApiProperty } from "@nestjs/swagger"

export class CreatePessoaDto {
    @ApiProperty()
    apelido: string

    @ApiProperty()
    nome: string

    @ApiProperty()
    nascimento: string

    @ApiProperty()
    stack?: string[]
}
