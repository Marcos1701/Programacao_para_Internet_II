import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
//> User(username, password, active, profile) que faz um Relacionamento One2One para Profile(name, email, avatar_url, city)
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    avatar_url: string;

    @Column({ nullable: true })
    city: string;

    @OneToOne(() => User, user => user.profile, { cascade: true })
    user: User;

    constructor(partial: Partial<Profile>) {
        Object.assign(this, partial);
    }

    getAvatarUrl(): string {
        return this.avatar_url ? this.avatar_url : 'sem foto';
    }

    getCity(): string {
        return this.city ? this.city : 'sem cidade';
    }

    getName(): string {
        return this.name ? this.name : 'sem nome';
    }

    getEmail(): string {
        return this.email ? this.email : 'sem email';
    }

    getId(): number {
        return this.id ? this.id : 0;
    }

}
