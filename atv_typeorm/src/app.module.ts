import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ProfileModule, UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
