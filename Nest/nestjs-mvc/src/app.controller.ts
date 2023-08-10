import { Get, Controller, Render, Query } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root(@Query('name') name: string) {
    if (name) {
      return { message: `Hello ${name}!` };
    }
    return { message: 'Hello world!' };
  }
}