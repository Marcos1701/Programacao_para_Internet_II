import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { Profile } from './profile/entities/profile.entity';

@Controller()
export class AppController {

  /* 
  GET /tasks?done=[y | n]&order_by=[name, created_at]
GET /tasks/<id>
POST /tasks
DELETE /tasks
  */

  constructor(private readonly appService: AppService) { }

  @Get()
  getUser(): User {
    return this.appService.getUser();
  }

  @Get('/Task')
  getTasks(): string {
    return 'getTasks';
  }


}
