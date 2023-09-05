import { Body, Injectable, HttpStatus, Res } from '@nestjs/common';
import { ulid } from 'ulidx';
import { Request, Response } from 'express';
import { getProdutos, getProduto, addProduto, removeProduto, updateProduto, mudar_status } from './database'

export enum Status {
  DISPONIVEL = 'D',
  INDISPONIVEL = 'I'
}
export interface ProdutoBase {
  nome: string,
  taxa_rentabilidade: number,
  prazo: number,
  taxa_adm: number,
  vencimento: Date,
  liquidez: boolean
}

export interface Page {
  name: string,
  href: string
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
    taxa_rentabilidade: number,
    prazo: number,
    taxa_adm: number,
    vencimento: Date,
    liquidez: boolean
  ) {

    if (!nome || nome.length > 32) {
      throw new Error('Nome inválido');
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
    this._status = Status.DISPONIVEL;
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
    res.status(HttpStatus.OK).json({
      message: "Seja bem vindo ao Lab 2!"
    })
  }

  async getProdutosLab2(@Res() resp: Response): Promise<void> {
    await getProdutos().then((produtos: Produto[]) => {
      resp.status(HttpStatus.OK).json({
        message: "Lista de Produtos",
        produtos: produtos
      })
    }).catch((err) => {
      resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao buscar produtos"
      })
    });
  }

  async getProdutoLab2(@Body('id') id: string, res: Response): Promise<void> {

    const produto = await getProduto(id);
    if (!produto) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: "Produto não encontrado."
      })
      return;
    }
    res.status(HttpStatus.OK).json({
      message: "Produto encontrado com sucesso!",
      produto: produto
    })
  }

  async addProdutoLab2(body: ProdutoBase, res: Response): Promise<void> {
    Object.keys(body).forEach((key) => {
      if (body[key] == null) {
        res.status(HttpStatus.NOT_FOUND).json({
          message: `O valor de "${key}" é nulo/inválido.`
        });
        return;
      }
    });

    const produto = new Produto(
      body.nome,
      body.taxa_rentabilidade,
      body.prazo,
      body.taxa_adm,
      body.vencimento,
      body.liquidez
    );
    try {
      addProduto(produto);
      res.status(HttpStatus.OK).json({
        message: "Produto adicionado com sucesso!",
        produto: produto
      });
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: e.message ? e.message : "Ocorreu um erro ao adicionar o Produto."
      });
      return;
    }
  }

  async removeProdutoLab2(id: string, res: Response) {
    if (!id) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: "Id não informado."
      });
      return;
    }

    try {
      removeProduto(id);
      res.status(HttpStatus.CREATED).json({
        message: "Produto removido com sucesso!"
      });
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: "Produto não encontrado!!"
      });
      return;
    }
  }

  async atualizarProduto(id: string, body: ProdutoBase, res: Response) {
    try {
      const produto: Produto = await getProduto(id);

      if (!produto) {
        res.status(HttpStatus.CREATED).json({
          message: "Produto não encontrado, criando novo produto!"
        });
        this.addProdutoLab2(body, res);
        return;
      }

      const novo_produto = new Produto(
        body.nome ? body.nome : produto.nome,
        body.taxa_rentabilidade ? body.taxa_rentabilidade : produto.taxa_rentabilidade,
        body.prazo ? body.prazo : produto.prazo,
        body.taxa_adm ? body.taxa_adm : produto.taxa_adm,
        body.vencimento ? body.vencimento : produto.vencimento,
        body.liquidez ? body.liquidez : produto.liquidez
      );

      updateProduto(id, novo_produto);
      res.status(HttpStatus.OK).json({
        message: "Produto atualizado com sucesso!"
      });
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: "Produto não encontrado!!"
      });
      return;
    }
  }

  async alterar_status_produto(id: string, res: Response) {
    try {
      mudar_status(id, res);
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).json({
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
        placeholder: string,
        select?: boolean,
        options?: {
          value: string,
          text: string
        }[]
      }[],
      submitText: string
    },
    pages: Page[]
  } {
    return {
      title: 'Adicionar Produto',
      form: {
        action: '/lab1/produtos/adicionar',
        method: 'POST',
        inputs: [
          {
            name: 'nome',
            type: 'text',
            placeholder: 'Nome do Produto'
          },
          {
            name: 'status',
            type: 'select',
            select: true,
            options: [
              {
                value: 'D',
                text: 'Disponível'
              },
              {
                value: 'I',
                text: 'Indisponível'
              }
            ],
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
            type: 'select',
            placeholder: 'Liquidez',
            select: true,
            options: [
              {
                value: 'true',
                text: 'Sim'
              },
              {
                value: 'false',
                text: 'Não'
              }
            ]

          }
        ],
        submitText: 'Adicionar'
      },
      pages: pages
    }
  }


  addProduto(produto: {
    nome: string,
    taxa_rentabilidade: number,
    prazo: number,
    taxa_adm: number,
    vencimento: Date,
    liquidez: string
  }): {
    status: number
  } {

    const newProduto: Produto = new Produto(
      produto.nome, produto.taxa_rentabilidade,
      produto.prazo, produto.taxa_adm, produto.vencimento,
      produto.liquidez === 'Sim'
    );
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
