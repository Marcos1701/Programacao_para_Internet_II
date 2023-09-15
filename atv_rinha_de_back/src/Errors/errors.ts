import { HttpStatus } from '@nestjs/common';
export class Unprocessable_Entity_or_Content_Error extends Error {
    status: number = HttpStatus.UNPROCESSABLE_ENTITY;
    constructor(message: string) {
        super(message);
        this.name = 'Unprocessable_Entity_or_Content_Error';
    }
}

export class Not_Found_Error extends Error {
    status: number = HttpStatus.NOT_FOUND;
    constructor(message: string) {
        super(message);
        this.name = 'Not_Found_Error';
    }
}

export class Internal_Server_Error extends Error {
    status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    constructor(message: string) {
        super(message);
        this.name = 'Internal_Server_Error';
    }
}

export class Bad_Request_Error extends Error {
    status: number = HttpStatus.BAD_REQUEST;
    constructor(message: string) {
        super(message);
        this.name = 'Bad_Request_Error';
    }
}