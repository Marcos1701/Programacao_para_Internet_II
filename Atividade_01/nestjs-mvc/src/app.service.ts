import { Injectable } from '@nestjs/common';

enum Status {
  ATIVO = 'ativo',
  INATIVO = 'inativo'
}

class Produto {
  constructor(
    public id: number,
    public nome: string,
    public status: Status
  ) { }
}

const Produtos: Produto[] = [];
@Injectable()
export class AppService {
  getHome(): {
    title: string,
    anchor: {
      title: string,
      href: string
    }[]
  } {
    return {
      title: 'Home',
      anchor: [

        {
          title: 'Home',
          href: '/'
        },
        {
          title: 'Lista de Produtos',
          href: '/produtos'
        },
        {
          title: 'Adicionar Produto',
          href: '/produtos/adicionar'
        },
        {
          title: 'Remover Produto',
          href: '/produtos/remover'
        }
      ]
    }
  }

  getProdutos(): {
    title: string,
    produtos: {
      id: string,
      nome: string,
      status: Status,
      href: string
    }[]
  } {
    const prod: {
      id: string,
      nome: string,
      status: Status,
      href: string
    }[] = [];
    Produtos.forEach((produto) => {
      prod.push({
        id: produto.id.toString(),
        nome: produto.nome,
        status: produto.status,
        href: `/produtos/${produto.id}`
      })
    })

    return {
      title: 'Lista de Produtos',
      produtos: prod
    }
  }
}
