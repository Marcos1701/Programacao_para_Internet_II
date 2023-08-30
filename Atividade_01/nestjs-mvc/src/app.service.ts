import { Injectable } from '@nestjs/common';

enum Status {
  ATIVO = 'ativo',
  INATIVO = 'inativo'
}

export interface Page {
  name: string,
  href: string
}

class Produto {
  constructor(
    public id: number,
    public nome: string,
    public status: Status
  ) { }
}

const Produtos: Produto[] = [];
const pages: Page[] = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Lista de Produtos',
    href: 'produtos'
  },
  {
    name: 'Adicionar Produto',
    href: 'produtos/adicionar'
  }
]

@Injectable()
export class AppService {
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
        id: produto.id.toString(),
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

  getProduto(id: number): {
    title: string,
    produto: {
      id: string,
      nome: string,
      status: Status
    },
    pages: Page[]
  } {
    const produto = Produtos.find((produto) => produto.id === id);

    return {
      title: 'Produto',
      produto: {
        id: produto.id.toString(),
        nome: produto.nome,
        status: produto.status
      },
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
          }
        ],
        submitText: 'Adicionar'
      },
      pages: pages
    }
  }


  addProduto(produto: {
    nome: string
  }): {
    status: number
  } {
    const id: number = Produtos.length + 1;
    const newProduto: Produto = new Produto(id, produto.nome, Status.ATIVO);
    Produtos.push(newProduto);

    return { status: 201 }
  }

  removeProduto(id: number): {
    status: number
  } {
    const index = Produtos.findIndex((produto) => produto.id === id);
    Produtos.splice(index, 1);

    return { status: 200 }
  }

  mudarStatusProduto(id: number): {
    status: number
  } {
    const index = Produtos.findIndex((produto) => produto.id === id);
    if (index === -1) return { status: 404 }
    if (Produtos[index].status === Status.ATIVO) {
      Produtos[index].status = Status.INATIVO;
    } else {
      Produtos[index].status = Status.ATIVO;
    }

    return { status: 200 }
  }
}
