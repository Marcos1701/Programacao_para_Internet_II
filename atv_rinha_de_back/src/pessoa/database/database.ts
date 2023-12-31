import { Client } from 'pg'
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { Pessoa } from '../entities/pessoa.entity';
dotenv.config({ path: '.enc.local' });

// dotenv está sendo utilizado para ocultar as informações de conexão com o banco de dados.
// isso é apenas uma maneira de ocultar essas informaçoes "secretas"..

const db = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})


const inicialize = async () => {
    try {
        await db.connect().catch((err) => console.log(err));

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
        CREATE OR REPLACE TRIGGER alter_pessoa
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
        $$ language 'plpgsql';
    `);

        await db.query(`
        CREATE OR REPLACE TRIGGER adicionar_pessoa
        BEFORE INSERT ON pessoa
        FOR EACH ROW
        EXECUTE PROCEDURE add_pessoa();
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

    } catch (err) {
        console.log(`Ocorreu um erro ao inicializar o banco de dados:\n - ${err.message}`);
    }
}

inicialize();

export default db;


// Versão com Supabase (usando o typeORM)
// const supabase = createClient<Database>(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_KEY,
//     {
//         auth: {
//             persistSession: false
//         }
//     }
// );

// const getAllPessoas = async () => {
//     const { data, error } = await supabase
//         .from('pessoa')
//         .select('*');

//     if (error) {
//         throw new Error(error.message);
//     }

//     console.log(data);
// }

// const insertPessoa = async (pessoa: Pessoa): Promise<Pessoa> => {
//     const { error } = await supabase
//         .from('pessoa')
//         .insert([
//             {
//                 id: pessoa.id,
//                 apelido: pessoa.apelido,
//                 nome: pessoa.nome,
//                 nascimento: pessoa.nascimento
//             }
//         ]);

//     if (error) {
//         throw new Error(error.message);
//     }

//     const { data, error: errorStack } = await supabase
//         .from('stack')
//         .insert(pessoa.stack.map((item: string) => {
//             return {
//                 id_pessoa: pessoa.id,
//                 stack: item
//             }
//         }));

//     if (errorStack) {
//         throw new Error(errorStack.message);
//     }
//     return pessoa;
// }

// const deletePessoa = async (id_pessoa: string) => {
//     const { data, error } = await supabase
//         .from('pessoa')
//         .delete()
//         .match({ id: id_pessoa });

//     if (error) {
//         throw new Error(error.message);
//     }
// }

// const getPessoa = async (id_pessoa: string) => {
//     const { data, error } = await supabase
//         .from('pessoa')
//         .select('*')
//         .match({ id: id_pessoa });

//     if (error) {
//         throw new Error(error.message);
//     }

//     return data;
// }

// const get_contagem = async () => {
//     const { data, error } = await supabase
//         .from('pessoa')
//         .select('apelido');

//     if (error) {
//         throw new Error(error.message);
//     }

//     return data.length;
// }

// const get_stack = async (id_pessoa: string) => {
//     const { data, error } = await supabase
//         .rpc('get_stack', { id: id_pessoa });

//     //rpc -> remote procedure call
//     //  em resumo, é uma chamada de função remota

//     if (error) {
//         throw new Error(error.message);
//     }

//     return data;
// }
//...
