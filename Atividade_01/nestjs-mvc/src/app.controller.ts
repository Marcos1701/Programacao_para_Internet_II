import { Get, Controller, Render, Module } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
@Controller()
export class AppController {
  @Get()
  @Render('index')
  home() {
    // return this.AppService.getHome();
  }
  // @Get()
  // @Render('index')
  // root() {
  //   return {
  //     messages: [
  //       {
  //         message: 'Hello World!!',
  //         id: 'hello-world',
  //         title: 'Hello World'
  //       },
  //       {
  //         message: 'Olá Mundo!!',
  //         id: 'ola-mundo',
  //         title: 'Olá Mundo'
  //       }
  //     ]
  //   };
  // }

}