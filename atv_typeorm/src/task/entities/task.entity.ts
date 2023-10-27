import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 30 })
    name: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    tags: string

    @Column({ type: 'boolean', default: false })
    done: boolean;

    @ManyToOne(() => User, user => user.Tasks)
    user: User;

    constructor(partial: Partial<Task>) {
        Object.assign(this, partial);
    }

    getName(): string {
        return this.name ? this.name : 'sem nome';
    }

    getDescription(): string {
        return this.description ? this.description : 'sem descrição';
    }

    getTags(): string {
        return this.tags ? this.tags : 'sem tags';
    }

    getDone(): boolean {
        return this.done ? this.done : false;
    }

    getId(): number {
        return this.id ? this.id : 0;
    }
}
