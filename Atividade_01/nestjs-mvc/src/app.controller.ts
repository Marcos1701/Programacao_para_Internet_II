import { Get, Controller, Render, Module, Injectable, Query, Post, Body, Res, Req, Redirect } from '@nestjs/common';
import { AppService, Page } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

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
        }
      ]
    }
  }

  @Get('/lab1')
  @Render('lab1')
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
  @Get('/lab1/produtos')
  @Render('lab1')
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
  @Get('/lab1/produtos/adicionar')
  @Render('lab1')
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
          placeholder: string
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

  @Post('/lab1/produtos/adicionar')
  @Render('lab1')
  @Redirect('/lab1/produtos')
  produto_adicionar(
    @Body('nome') nome: string
  ): void {
    this.appService.addProduto({ nome });
  }

  @Get('/lab1/produtos/:id/remover')
  @Render('index')
  @Redirect('/lab1/produtos')
  produto_remover(
    @Query('id') id: string
  ): void {
    this.appService.removeProduto(parseInt(id));
  }

  @Get('/lab1/produtos/:id/mudar-status')
  @Render('lab1')
  @Redirect('/lab1/produtos')
  produto_mudar_status(
    @Query('id') id: string
  ): void {
    this.appService.mudarStatusProduto(parseInt(id));
  }
  @Get('hello-world')
  @Render('index')
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