import { NotFoundException } from "@nestjs/common";
import { Profile } from "src/profile/entities/profile.entity";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
// @> User(username, password, active, profile) que faz um Relacionamento One2One para Profile(name, email, avatar_url, city)
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 50 })
    username: string;

    @Column({ nullable: false, length: 100 })
    password: string;

    @Column({ nullable: false, default: true })
    active: boolean;

    @OneToOne(() => Profile, profile => profile.user, { cascade: true })
    profile: Profile; // no banco de dados, o campo profile_id é criado automaticamente

    // para indicar que um usuario pode ter varias tarefas, usamos o decorator @OneToMany
    @OneToMany(() => Task, task => task.user)
    Tasks: Task[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    CriarTarefa(task: CreateTaskDto): void {
        this.Tasks.push(new Task(task));
    }

    TarefasConcluidas(): Task[] {
        return this.Tasks.filter(task => task.done === true);
    }

    getTasksDoneAndOrder(order: string[]): Task[] {
        order = order.map(order => order.toLowerCase());
        const tasks = this.TarefasConcluidas();

        if (order.includes('name')) {
            tasks.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (order.includes('created_at')) {
            tasks.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
        }

        if (order.includes('tags')) {
            tasks.sort((a, b) => a.tags.localeCompare(b.tags));
        }

        if (order.includes('description')) {
            tasks.sort((a, b) => a.description.localeCompare(b.description));
        }

        return tasks;
    }

    getTasksOrderned(order: string[]): Task[] {
        order = order.map(order => order.toLowerCase());
        const tasks = this.Tasks;

        //verifica se o array order contem elementos validos
        for (let ord of order) {
            if (!['name', 'created_at', 'tags', 'description'].includes(ord)) {
                throw new NotFoundException(`O parametro ${ord} não é valido`);
            }
        }

        if (order.includes('name')) {
            tasks.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (order.includes('created_at')) {
            tasks.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
        }

        if (order.includes('tags')) {
            tasks.sort((a, b) => a.tags.localeCompare(b.tags));
        }

        if (order.includes('description')) {
            tasks.sort((a, b) => a.description.localeCompare(b.description));
        }

        return tasks;
    }

    getTask(id: number): Task {
        return this.Tasks.find(task => task.id === id);
    }

    getTasks(): Task[] {
        return this.Tasks;
    }
}