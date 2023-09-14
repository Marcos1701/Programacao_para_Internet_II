import { ulid } from 'ulidx';

export class Pessoa {
    id: string = ulid();
    apelido: string;
    nome: string;
    nascimento: string; // formato: 'YYYY-MM-DD'
    stack: string[] = [];

    constructor(apelido: string, nome: string, nascimento: string, stack?: string[]) {
        if (apelido.length > 32 || apelido.length === 0) {
            throw new Error('Apelido inválido');
        }

        if (nome.length > 100) {
            throw new Error('Nome deve ter no mínimo 1 e no máximo 100 caracteres');
        }

        if (!nascimento.match(/^\d{4}-\d{2}-\d{2}$/)) { // formato: 'YYYY-MM-DD'
            throw new Error('Data de nascimento inválida');
        }

        if (stack && stack.length > 0) {
            stack.forEach((item: string) => {
                if (!isNaN(parseInt(item)) || item.length > 32) {
                    throw new Error('Stack inválida');
                }
            });

            this.stack = stack;
        }
        this.apelido = apelido;
        this.nome = nome;
        this.nascimento = nascimento;
    }

    setStack(stack: string[]) {
        this.stack = stack;
    }
}