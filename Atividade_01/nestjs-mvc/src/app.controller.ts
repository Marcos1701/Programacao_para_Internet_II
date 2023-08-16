import { Get, Controller, Render } from '@nestjs/common';


@Controller()
export class AppController {
  @Get()
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
      ]
    };
  }

}