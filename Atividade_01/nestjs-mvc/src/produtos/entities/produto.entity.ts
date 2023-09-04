import { ulid } from "ulidx";

export enum Status {
    DISPONIVEL = 'D',
    INDISPONIVEL = 'I'
}

export class Produto {
  
  private _id: string = ulid()
  private _nome: string;
  private _destinacao: string;
  private _status: Status;
  private _taxa_rentabilidade: number;
  private _prazo: number;
  private _taxa_adm: number;
  private _vencimento: Date;
  private _liquidez: boolean;

  constructor(
    nome: string,
    destinacao:string,
    status: Status,
    taxa_rentabilidade: number,
    prazo: number,
    taxa_adm: number,
    vencimento: Date,
    liquidez: boolean
  ) {

    if (!nome || nome.length > 32) {
      throw new Error('Nome inválido');
    }
    if(!destinacao){
        throw new Error('Destinação inválida');
    }
    if (!status) {
      throw new Error('Status inválido');
    }
    if (!taxa_rentabilidade || taxa_rentabilidade < 0 || taxa_rentabilidade > 20) {
      throw new Error('Taxa de rentabilidade inválida');
    }
    if (!prazo || prazo < 0 || prazo > 48) throw new Error('Prazo inválido');
    if (!taxa_adm || taxa_adm < 0) {
      throw new Error('Taxa de administração inválida');
    }
    if (!vencimento || vencimento < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1) // Vencimento não pode ser menor que a data atual
    ) {
      throw new Error('Vencimento inválido');
    }
    if (liquidez === undefined) {
      throw new Error('Liquidez inválida');
    }


    this._nome = nome;
    this._destinacao = destinacao;
    this._status = status;
    this._taxa_rentabilidade = taxa_rentabilidade;
    this._prazo = prazo;
    this._taxa_adm = taxa_adm;
    this._vencimento = vencimento;
    this._liquidez = liquidez;
  }

  get id(): string{
    return this._id
  }

  get nome(): string {
    return this._nome;
  }

  get destinacao(): string{
    return this._destinacao
  }

  get status(): Status {
    return this._status;
  }

  get taxa_rentabilidade(): number {
    return this._taxa_rentabilidade;
  }

  get prazo(): number {
    return this._prazo;
  }

  get taxa_adm(): number {
    return this._taxa_adm;
  }

  get vencimento(): Date {
    return this._vencimento;
  }

  get liquidez(): boolean {
    return this._liquidez;
  }

  alterarStatus(): void {
    if (this._status === Status.DISPONIVEL) {
      this._status = Status.INDISPONIVEL;
      return;
    }
    this._status = Status.DISPONIVEL;
  }

  set nome(nome: string) {
    if (!nome || this.nome === nome || nome.length > 32) { return; }

    this._nome = nome;
  }

  set taxa_rentabilidade(taxa_rentabilidade: number) {
    if (!taxa_rentabilidade || this.taxa_rentabilidade === taxa_rentabilidade
      || taxa_rentabilidade < 0 || taxa_rentabilidade > 20) {
      throw new Error('Taxa de rentabilidade inválida');
    }
    this._taxa_rentabilidade = taxa_rentabilidade;
  }

  set prazo(prazo: number) {
    if (!prazo || this.prazo === prazo || prazo < 0 || prazo > 48) {
      throw new Error('Prazo inválido');
    }
    this._prazo = prazo;
  }

  set taxa_adm(taxa_adm: number) {
    if (!taxa_adm || this.taxa_adm === taxa_adm || taxa_adm < 0) {
      throw new Error('Taxa de administração inválida');
    }
    this._taxa_adm = taxa_adm;
  }

  set vencimento(vencimento: Date) {
    if (!vencimento || this.vencimento === vencimento || vencimento < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1) // Vencimento não pode ser menor que a data atual
    ) {
      throw new Error('Vencimento inválido');
    }
    this._vencimento = vencimento;
  }

  set liquidez(liquidez: boolean) {
    if (liquidez === undefined || this.liquidez === liquidez) {
      throw new Error('Liquidez inválida');
    }
    this._liquidez = liquidez;
  }

  toJSON(): {
    id: string,
    nome: string,
    status: Status,
    taxa_rentabilidade: number,
    prazo: number,
    taxa_adm: number,
    vencimento: Date,
    liquidez: boolean
  } {
    return {
      id: this._id,
      nome: this._nome,
      status: this._status,
      taxa_rentabilidade: this._taxa_rentabilidade,
      prazo: this._prazo,
      taxa_adm: this._taxa_adm,
      vencimento: this._vencimento,
      liquidez: this._liquidez
    }
  }
}
