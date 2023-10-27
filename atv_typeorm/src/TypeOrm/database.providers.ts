import { DataSource } from "typeorm";

import { Profile } from "../profile/entities/profile.entity";
import { User } from "../user/entities/user.entity";
import { Task } from "src/task/entities/task.entity";

export const entities = [
    Profile,
    User,
    Task
];

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "postgres",
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
                migrations: [
                    __dirname + '/migrations/*{.ts,.js}',
                ],
            });

            return dataSource.initialize();
        },
    },
];