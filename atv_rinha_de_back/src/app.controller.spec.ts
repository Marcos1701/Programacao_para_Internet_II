import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return message', () => {
      expect(appController.getMessage()).toBe(
        `<h1>Seja Bem vindo á api de rinha de back-end!</h1> 
      <p>Para acessar a documentação da api, acesse: <a href="http://localhost:3000/docs/">docs</a></p>
      `);
    });
  });
});
