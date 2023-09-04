import { Get, Controller, Render, Module, Injectable, Query, Post, Body, Res, Req, Redirect, HttpStatus } from '@nestjs/common';
import { AppService, Page, Status } from './app.service';
import { Request, Response } from 'express';
import {
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiTags
} from '@nestjs/swagger'

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }
  @ApiTags('Home')
  @Get('/')
  @Render('index')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
  })
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
  @Render('lab2')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
  })
  homeLab2(@Res() response: Response) {
    this.appService.getHomeLab2(response);
  }

  @ApiTags('Lab 2')
  @Get('/lab2/produtos')
  @Render('lab2')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
  })
  produtosLab2(@Req() request: Request, @Res() response: Response) {
    this.appService.getProdutosLab2(request, response);
  }

  @ApiTags('Lab 2')
  @Get('/lab2/produtos/:id')
  @Render('lab2')
  @ApiResponse({
    status: 200,
    description: "Operação ocorreu com sucesso"
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
    @Body() body: { nome: string, status: Status, taxa_rentabilidade: number, prazo: number, taxa_adm: number, vencimento: Date, liquidez: boolean }
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
