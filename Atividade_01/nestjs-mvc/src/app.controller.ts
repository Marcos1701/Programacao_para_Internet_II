import { Get, Controller, Render, Module, Injectable, Query, Post, Body, Res, Req, Redirect, HttpStatus, Delete, Patch, HttpCode } from '@nestjs/common';
import { AppService, Page, ProdutoBase, Status } from './app.service';
import { Request, Response } from 'express';
import {
  ApiBody,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';


@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }
  @ApiTags('Home')
  @Get('/')
  @Render('index')
  home() {
    return {
      anchors: [
        {
          name: 'Hello World',
          href: '/hello-world'
        },
        {
          name: 'Lab 1',
          href: '/lab1'
        },
        {
          name: 'Lab 2',
          href: '/lab2'
        },
        {
          name: 'Docs',
          href: '/api'
        }
      ]
    }
  }

  // Laboratório 2

  @ApiTags('Lab 2')
  @Get('/lab2')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
  })
  homeLab2(@Res() response: Response) {
    this.appService.getHomeLab2(response);
  }

  @ApiTags('Lab 2')
  @Get('/lab2/produtos')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
  })
  produtosLab2(@Res() response: Response) {
    this.appService.getProdutosLab2(response);
  }

  @ApiTags('Lab 2')
  @Get('/lab2/produtos/:id')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Ocorre quando o id é inválido ou não foi informado"
  })
  produtoLab2(@Body('id') id: string, @Req() request: Request, @Res() response: Response) {
    if (!id) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: "Id não informado."
      })
      return;
    }
    this.appService.getProdutoLab2(id, response);
  }

  @ApiTags('Lab 2')
  @Post('/lab2/produtos')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Operação ocorreu com sucesso, redirecionando para a pagina de listagem.."
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Ocorre quando algum dos valores enviados é inválido ou não foi informado"
  })
  @ApiBody({
    required: true,
    type: 'string',
    schema: {
      type: 'string',
      properties: {
        nome: {
          type: 'string'
        },
        taxa_rentabilidade: {
          type: 'number'
        },
        prazo: {
          type: 'number'
        },
        taxa_adm: {
          type: 'number'
        },
        vencimento: {
          type: 'string'
        },
        liquidez: {
          type: 'boolean'
        }
      }
    }
  })
  CreateProdutoLab2(@Body() body: ProdutoBase, @Res() response: Response) {
    this.appService.addProdutoLab2(body, response);
  }

  @ApiTags('Lab 2')
  @Delete('/lab2/produtos/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Operação ocorreu com sucesso, redirecionando para a pagina de listagem.."
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Ocorre quando o id é inválido ou não foi informado"
  })
  DeleteProdutoLab2(@Body('id') id: string, @Res() response: Response) {
    this.appService.removeProdutoLab2(id, response);
  }

  @ApiTags('Lab 2')
  @Patch('/lab2/produtos/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Operação ocorreu com sucesso, redirecionando para a pagina de listagem.."
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Ocorre quando o id é inválido ou não foi informado"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Ocorre quando o produto não foi encontrado e um novo foi criado"
  })
  UpdateProdutoLab2(@Body('id') id: string, @Body() body: ProdutoBase, @Res() response: Response) {
    this.appService.atualizarProduto(id, body, response);
  }

  @ApiTags('Lab 2')
  @Patch('/lab2/produtos/:id/mudar-status')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso, redirecionando para a pagina de listagem.."
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Ocorre quando o id é inválido ou não foi informado"
  })
  MudarStatusProdutoLab2(@Body('id') id: string, @Res() response: Response) {
    this.appService.alterar_status_produto(id, response);
  }


  // Laboratório 1
  @ApiTags('Lab 1')
  @Get('/lab1')
  @Render('lab1')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
  })
  homeLab1() {
    const retorno: {
      title: string,
      anchor: Page[]
    } = this.appService.getHome();

    return {
      title: retorno.title,
      anchors: retorno.anchor,
      main: {
        title: 'Home'
      },
      link_css: [
        "home.css",
        "basic.css"
      ]
    };
  }

  @ApiTags('Lab 1')
  @Get('/lab1/produtos')
  @Render('lab1')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
  })
  produtos(): {
    title: string,
    anchors: Page[],
    main: {
      title: string,
      produtos: {
        id: string,
        nome: string,
        status: string
      }[]
    },
    link_css: string[]
  } {
    const retorno = this.appService.getProdutos();
    return {
      title: retorno.title,
      anchors: retorno.pages,
      main: {
        title: 'Lista de Produtos',
        produtos: retorno.produtos
      },
      link_css: [
        "produtos.css",
        "basic.css"
      ]
    };
  }

  @ApiTags('Lab 1')
  @Get('/lab1/produtos/adicionar')
  @Render('lab1')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
  })
  produtos_adicionar(): {
    title: string,
    anchors: Page[],
    main: {
      title: string,
      form: {
        action: string,
        method: string,
        inputs: {
          name: string,
          type: string,
          placeholder: string,
          options?: {
            value: string,
            text: string
          }[]
        }[],
        submitText: string
      }
    },
    link_css: string[]
  } {
    const retorno = this.appService.getProdutosAdicionar();
    return {
      title: retorno.title,
      anchors: retorno.pages,
      main: {
        title: 'Adicionar Produto',
        form: retorno.form
      },
      link_css: [
        "produtos.css",
        "basic.css"
      ]
    };
  }

  @ApiTags('Lab 1')
  @Post('/lab1/produtos/adicionar')
  @Render('lab1')
  @Redirect('/lab1/produtos')
  @ApiResponse({
    status: 201,
    description: "Operação ocorreu com sucesso, redirecionando para a pagina de listagem.."
  })
  @ApiBody({
    required: true,
    type: 'string',
    schema: {
      type: 'string',
      properties: {
        nome: {
          type: 'string'
        }
      }
    }
  })
  produto_adicionar(
    @Body() body: {
      nome: string,
      taxa_rentabilidade: number,
      prazo: number,
      taxa_adm: number,
      vencimento: Date,
      liquidez: string
    }
  ): void {
    this.appService.addProduto(body);
  }

  @ApiTags('Lab 1')
  @Get('/lab1/produtos/:id/remover')
  @Render('index')
  @Redirect('/lab1/produtos')
  produto_remover(
    @Query('id') id: string
  ): void {
    this.appService.removeProduto(id);
  }

  @ApiTags('Lab 1')
  @Get('/lab1/produtos/:id/mudar-status')
  @Render('lab1')
  @Redirect('/lab1/produtos')
  produto_mudar_status(
    @Query('id') id: string
  ): void {
    this.appService.mudarStatusProduto(id);
  }

  @ApiTags('Hello World')
  @Get('hello-world')
  @Render('index')
  @ApiResponse({
    type: "application/json"
  })
  root() {
    return {
      messages: [
        {
          message: 'Hello World!!',
          id: 'hello-world',
          title: 'Hello World'
        },
        {
          message: 'Olá Mundo!!',
          id: 'ola-mundo',
          title: 'Olá Mundo'
        }
      ],
      link_css: [
        "css/styles.css",
      ]
    };
  }

}
