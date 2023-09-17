import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(): string {
    return `<h1>Seja Bem vindo á api de rinha de back-end!</h1> 
    <h2>Para acessar a documentação da api, acesse:</h2>
    ${this.getEndPoints()}
    `;
  }

  private getEndPoints(): string {

    return `
    <a href="./docs/">docs</a>
    <br>
    <h2>Endpoints</h2>

    <label for="pessoas">Get e Post: Pessoas --> </label>
    <a href="./pessoas" name="pessoas">/pessoas</a>
    <br>
    <label for="pessoa_id">Get Pessoa por id --> </label>
    <a href="./pessoas/01HACPCAPYBAKNW1STATZMRBPZ" name="pessoa_id">/pessoas/{id}</a>
    <br>
    <label for="pessoa_search">Get Pessoa por busca --> </label>
    <a href="./pessoas?t=Java" name="pessoa_search">/pessoas?t={termo}</a>
    <br>
    <label for="get_contagem"> Get Contagem --> </label>
    <a href="./contagem-pessoas" name="get_contagem">/get-contagem</a>
    `

  }
}
