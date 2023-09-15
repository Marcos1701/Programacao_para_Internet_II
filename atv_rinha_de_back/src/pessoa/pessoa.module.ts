import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { ClientDatabase } from './database/client.servise';


@Module({
    imports: [],
    controllers: [PessoaController],
    providers: [PessoaService, ClientDatabase],
})
export class PessoaModule { }
