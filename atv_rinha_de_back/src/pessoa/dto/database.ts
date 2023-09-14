import { Client } from 'pg'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.enc.local' });

const db = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

const inicialize = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS pessoa (
            id VARCHAR PRIMARY KEY,
            apelido VARCHAR(32) NOT NULL,
            nome VARCHAR(100) NOT NULL,
            nascimento CHAR(10) NOT NULL
        );
    `);

    await db.query(`
        CREATE TABLE IF NOT EXISTS stack (
            id_pessoa VARCHAR REFERENCES pessoa(id),
            stack VARCHAR(32) NOT NULL
        );
    `);

    await db.query(`
        CREATE OR REPLACE FUNCTION update_pessoa()
        RETURNS TRIGGER AS $$
        BEGIN
            IF NEW.stack IS NOT NULL THEN
                RAISE EXCEPTION 'Não é possível alterar a stack';
            END IF;
            RETURN NEW;
        END;
        $$ language 'plpgsql';
    `);

    await db.query(`
        CREATE TRIGGER update_pessoa
        BEFORE UPDATE ON pessoa
        FOR EACH ROW
        EXECUTE PROCEDURE update_pessoa();
    `);

    // o apelido deve ser único
    await db.query(`
        CREATE OR REPLACE FUNCTION add_pessoa()
        RETURNS TRIGGER AS $$
        BEGIN
            IF NEW.NOME IS NULL THEN
                RAISE EXCEPTION 'Nome não pode ser nulo';
            END IF;
            IF NEW.APELIDO IS NULL THEN
                RAISE EXCEPTION 'Apelido não pode ser nulo';
            END IF;
            IF NEW.NASCIMENTO IS NULL THEN
                RAISE EXCEPTION 'Nascimento não pode ser nulo';
            END IF;

            IF EXISTS (SELECT * FROM PESSOA WHERE APELIDO = NEW.APELIDO) THEN
                RAISE EXCEPTION 'Apelido já cadastrado';
            END IF;
            
            RETURN NEW;
        END;
    `);

    await db.query(`
        CREATE TRIGGER add_pessoa
        BEFORE INSERT ON pessoa
        FOR EACH ROW
        EXECUTE PROCEDURE add_pessoa();
    `);

    // Search -> recebe uma string e retorna todas as pessoas que possuem a string em algum dos campos ou nas suas stacks
    await db.query(`
        CREATE OR REPLACE FUNCTION SEARCH(WORD VARCHAR)
        RETURNS TABLE (ID VARCHAR, APELIDO VARCHAR, NOME VARCHAR, NASCIMENTO CHAR(10), STACK VARCHAR) AS $$
        BEGIN
            RETURN QUERY
            SELECT P.ID, P.APELIDO, P.NOME, P.NASCIMENTO, S.STACK
            FROM PESSOA P LEFT JOIN STACK S ON P.ID = S.ID_PESSOA
            WHERE P.APELIDO LIKE '%' || WORD || '%'
            OR P.NOME LIKE '%' || WORD || '%'
            OR S.STACK LIKE '%' || WORD || '%';
        END;
        $$ language 'plpgsql';
    `);

    // get_stack -> recebe um id e retorna todas as stacks da pessoa

    await db.query(`
        CREATE OR REPLACE FUNCTION GET_STACK(ID VARCHAR)
        RETURNS TABLE (STACK VARCHAR) AS $$
        BEGIN
            IF NOT EXISTS (SELECT * FROM PESSOA WHERE ID = ID) THEN
                RAISE EXCEPTION 'Pessoa não encontrada';
            END IF;
            RETURN QUERY
            SELECT STACK
            FROM STACK
            WHERE ID_PESSOA = ID;
        END;
        $$ language 'plpgsql';
    `);

}

db.connect()
    .then(() => {
        inicialize();
        console.log('Connected successfully')
    })
    .catch(e => console.log(e))
    .finally(() => db.end())


export default db;