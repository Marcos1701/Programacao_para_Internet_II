import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(): string {
    return `<h1>Seja Bem vindo á api de rinha de back-end!</h1> 
    <p>Para acessar a documentação da api, acesse: <a href="http://localhost:3000/docs/">docs</a></p>
    `;
  }
}
