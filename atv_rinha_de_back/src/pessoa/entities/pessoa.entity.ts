import {
    BadRequestException,
    UnprocessableEntityException
} from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger';
import { ulid } from 'ulidx';

export class Pessoa {
    @ApiProperty()
    id: string;

    @ApiProperty()
    apelido: string;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    nascimento: string; // formato: 'YYYY-MM-DD'

    @ApiProperty()
    stack: string[] = [];

    constructor(apelido: string, nome: string, nascimento: string, stack?: string[], id?: string) {

        if (!isNaN(parseInt(nome)) || !isNaN(parseInt(apelido))) {
            throw new BadRequestException('Nome e apelido devem ser strings');
        }

        if (apelido.length > 32 || apelido.length === 0) {
            throw new UnprocessableEntityException('Apelido deve ter no mínimo 1 e no máximo 32 caracteres');
        }

        if (nome.length > 100) {
            throw new UnprocessableEntityException('Nome deve ter no mínimo 1 e no máximo 100 caracteres');
        }

        if (!nascimento.match(/^\d{4}-\d{2}-\d{2}$/)) { // formato: 'YYYY-MM-DD'
            throw new BadRequestException('Data de nascimento inválida');
        }

        if (stack != undefined && stack.length > 0) {
            stack.forEach((item: string) => {
                if (!isNaN(parseInt(item)) || item.length > 32) {
                    throw new BadRequestException('stack deve ser um array de apenas strings');
                }
            });
            this.stack = stack;
        }
        this.id = id ? id : ulid();
        this.apelido = apelido;
        this.nome = nome;
        this.nascimento = nascimento;
    }

    setStack(stack: string[]) {
        this.stack = stack;
    }
}