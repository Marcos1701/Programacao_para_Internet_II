
import { CreatePessoaDto } from './create-pessoa.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {}
