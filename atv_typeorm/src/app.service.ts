import { Inject, Injectable } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { Profile } from './profile/entities/profile.entity';
import { CreateTaskDto } from './task/dto/create-task.dto';
import { Repository } from 'typeorm';
import { Task } from './task/entities/task.entity';

@Injectable()
export class AppService {
  UserPadrao: User = new User({
    username: 'admin',
    password: 'admin',
    active: true,
    profile: new Profile({
      name: 'Administrador',
      avatar_url: "sla",
      city: 'São Paulo',
      email: "sla@teste.com"
    })
  });


  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) { }

  getUser(): User {
    return this.UserPadrao;
  }

  async addTask(id: number, task: CreateTaskDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    user.CriarTarefa(task);
    return this.userRepository.save(user);
  }

  async getTask(id: number, task_id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user.getTask(task_id);
  }

  async getTasks(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user.Tasks;
  }

  async getTasksDone(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user.TarefasConcluidas();
  }

  async getTaskOrderned(id: number, order: string) {
    const orderArray = order.split(',');
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user.getTasksOrderned(orderArray);
  }

  async updateTask(id: number, task_id: number, task: CreateTaskDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    const taskIndex = user.Tasks.findIndex(task => task.id === task_id);
    user.Tasks[taskIndex] = new Task(task);
    return this.userRepository.save(user);
  }

  async deleteTask(id: number, task_id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    const taskIndex = user.Tasks.findIndex(task => task.id === task_id);
    user.Tasks.splice(taskIndex, 1);
    return this.userRepository.save(user);
  }

  async getProfile(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user.profile;
  }

  async getDoneAndOrder(id: number, order: string) {
    const orderArray = order.split(',');
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user.getTasksDoneAndOrder(orderArray);
  }
}
