

// DTO = Data Transfer Object
// Serve para transferir dados entre camadas, ou seja, entre o controller e o service, por exemplo.
// O DTO é uma classe que contém apenas os atributos que serão transferidos entre as camadas.
export class CreateTaskDto {
    name: string;
    description: string;
    tags: string;
    done: boolean;
    user_id: number;
}
