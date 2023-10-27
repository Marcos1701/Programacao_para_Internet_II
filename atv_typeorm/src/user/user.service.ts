import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { Task } from 'src/task/entities/task.entity';

@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
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
