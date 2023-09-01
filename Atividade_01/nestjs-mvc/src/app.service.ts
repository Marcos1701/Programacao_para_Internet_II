import { Body, Injectable } from '@nestjs/common';
import { ulid } from 'ulidx';
import { Request, Response } from 'express';
import { getProdutos, getProduto, addProduto, removeProduto, updateProduto} from './database'

export enum Status {
  ATIVO = 'ativo',
  INATIVO = 'inativo'
}

export interface Page {
  name: string,
  href: string
}

export class ProductBase {
  constructor(
    public nome: string
  ) { }
}

export class Produto {
  private _id: string = ulid();
  private _nome: string;
  private _status: Status;
  private _taxa_rentabilidade: number;
  private _prazo: number;
  private _taxa_adm: number;
  private _vencimento: Date;
  private _liquidez: boolean;

  constructor(
    nome: string,
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
    this._status = status;
    this._taxa_rentabilidade = taxa_rentabilidade;
    this._prazo = prazo;
    this._taxa_adm = taxa_adm;
    this._vencimento = vencimento;
    this._liquidez = liquidez;
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
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
    if (this._status === Status.ATIVO) {
      this._status = Status.INATIVO;
      return;
    }
    this._status = Status.ATIVO;
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

const Produtos: Produto[] = [];

const pages: Page[] = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Lista de Produtos',
    href: 'lab1/produtos'
  },
  {
    name: 'Adicionar Produto',
    href: 'lab1/produtos/adicionar'
  }
]

@Injectable()
export class AppService {


  // Laboratório 02
  getHomeLab2(res: Response): void {
    res.status(200).json({
      message: "Seja bem vindo ao Lab 2!"
    })
  }

  getProdutosLab2(req: Request, res: Response): void {
    getProdutos().then((produtos: Produto[]) => {
      res.status(200).json({
        message: "Lista de Produtos",
        produtos: produtos
      })
    }).catch((err) => {
      res.status(500).json({
        message: "Erro ao buscar produtos"
      })
      console.log(err.message);
    });
  }

  async getProdutoLab2(@Body('id') id: string, res: Response): Promise<void> {

    if (!id) {
      res.status(400).json({
        message: "Id não informado."
      })
      return;
    }

    const produto = await getProduto(id);
    if (!produto) {
      res.status(404).json({
        message: "Produto não encontrado."
      })
      return;
    }
    res.status(200).json({
      message: "Produto encontrado com sucesso!",
      produto: produto
    })
  }

  async addProdutoLab2(body: {
    nome: string, 
    status: Status, 
    taxa_rentabilidade: number, 
    prazo: number, 
    taxa_adm: number, 
    vencimento: Date, 
    liquidez: boolean
  }, res: Response): Promise<void>{
    Object.keys(body).forEach((key) =>{
      if(body[key] == null){
        res.status(404).json({
          message: `O valor de "${key}" é nulo/inválido.`
        });
        return;
      }
    });

    const produto = new Produto(
      body.nome,
      body.status,
      body.taxa_rentabilidade,
      body.prazo,
      body.taxa_adm,
      body.vencimento,
      body.liquidez
    );
    try{
      addProduto(produto);
      res.status(200).json({
        message: "Produto adicionado com sucesso!",
        produto: produto
      });
    }catch(e){
      res.status(404).json({
        message: e.message ? e.message : "Ocorreu um erro ao adicionar o Produto."
      });
      return;
    }
  }

  async removerProdutoLab2(id: string, res: Response){
    if(!id){
      res.status(400).json({
        message: "Id não informado."
      });
      return;
    }

    try{
      removeProduto(id);
      res.status(201).json({
        message: "Produto removido com sucesso!"
      });
    }catch(e){
      res.status(404).json({
        message: "Produto não encontrado!!"
      });
      return;
    }
  }

  async atualizarProduto(
    body: {
      id: string,
      nome: string, 
      status: Status, 
      taxa_rentabilidade: number, 
      prazo: number, 
      taxa_adm: number, 
      vencimento: Date, 
      liquidez: boolean
    }, res: Response){
      try{
        const produto = await getProduto(body.id);
        const novo_produto = new Produto(
          body.nome ? body.nome : produto.nome, 
          body.status ? body.status : produto.status,
          body.taxa_rentabilidade ? body.taxa_rentabilidade : produto.taxa_rentabilidade,
          body.prazo ? body.prazo : produto.prazo,
          body.taxa_adm ? body.taxa_adm : produto.taxa_adm,
          body.vencimento ? body.vencimento : produto.vencimento,
          body.liquidez ? body.liquidez : produto.liquidez
        );

        updateProduto(body.id, novo_produto);
        res.status(200).json({
          message: "Produto atualizado com sucesso!"
        });
      }catch(e){
        res.status(404).json({
          message: "Produto não encontrado!!"
        });
        return;
     }
  }




  // Laboratório 01
  getHome(): {
    title: string,
    anchor: Page[]
  } {
    return {
      title: 'Home',
      anchor: pages
    }
  }

  getProdutos(): {
    title: string,
    produtos: {
      id: string,
      nome: string,
      status: Status
    }[],
    pages: Page[]
  } {
    const prod: {
      id: string,
      nome: string,
      status: Status
    }[] = [];
    Produtos.forEach((produto) => {
      prod.push({
        id: produto.id,
        nome: produto.nome,
        status: produto.status
      })
    })

    return {
      title: 'Lista de Produtos',
      produtos: prod,
      pages: pages
    }
  }

  getProduto(id: string): {
    title: string,
    produto: Produto,
    pages: Page[]
  } {
    const prod: Produto = Produtos.find((produto) => produto.id === id);

    return {
      title: 'Produto',
      produto: prod,
      pages: pages
    }
  }

  getProdutosAdicionar(): {
    title: string,
    form: {
      action: string,
      method: string,
      inputs: {
        name: string,
        type: string,
        placeholder: string
      }[],
      submitText: string
    },
    pages: Page[]
  } {
    return {
      title: 'Adicionar Produto',
      form: {
        action: '/produtos/adicionar',
        method: 'POST',
        inputs: [
          {
            name: 'nome',
            type: 'text',
            placeholder: 'Nome do Produto'
          },
          {
            name: 'status',
            type: 'text',
            placeholder: 'Status do Produto'
          },
          {
            name: 'taxa_rentabilidade',
            type: 'number',
            placeholder: 'Taxa de Rentabilidade'
          },
          {
            name: 'prazo',
            type: 'number',
            placeholder: 'Prazo'
          },
          {
            name: 'taxa_adm',
            type: 'number',
            placeholder: 'Taxa de Administração'
          },
          {
            name: 'vencimento',
            type: 'date',
            placeholder: 'Vencimento'
          },
          {
            name: 'liquidez',
            type: 'boolean',
            placeholder: 'Liquidez'
          }
        ],
        submitText: 'Adicionar'
      },
      pages: pages
    }
  }


  addProduto(produto: {
    nome: string, status: Status, taxa_rentabilidade: number, prazo: number, taxa_adm: number, vencimento: Date, liquidez: boolean
  }): {
    status: number
  } {
    const newProduto: Produto = new Produto(produto.nome, produto.status, produto.taxa_rentabilidade, produto.prazo, produto.taxa_adm, produto.vencimento, produto.liquidez);
    Produtos.push(newProduto);

    return { status: 201 }
  }

  removeProduto(id: string): {
    status: number
  } {
    const index = Produtos.findIndex((produto) => produto.id === id);
    if (index === -1) return { status: 404 }
    Produtos.splice(index, 1);

    return { status: 200 }
  }

  mudarStatusProduto(id: string): {
    status: number
  } {
    const index = Produtos.findIndex((produto) => produto.id === id);
    if (index === -1) return { status: 404 }
    Produtos[index].alterarStatus();
    return { status: 200 }
  }
}
