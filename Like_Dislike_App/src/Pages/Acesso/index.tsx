import React, { useState } from "react";
import { IAutor } from "../TopicosPage";
import { Cadastro } from "./Cadastro";
import { Login } from "./Login";

interface AcessoProps {
    setusuario: (usuario: IAutor) => void
}

export interface Usuario {
    nome: string
    senha: string
    cidade: string
    pais: string
}

export function Acesso({ setusuario }: AcessoProps) {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])

    const realizarCadastro = (usuario: Usuario) => {
        setUsuarios([...usuarios, usuario])
        setusuario(usuario);
    }

    return (
        <>
            <button onClick={() => <Cadastro realizarCadastro={realizarCadastro} usuarios={usuarios} />}>Cadastrar</button>
            <button onClick={() => <Login usuarios={usuarios} setusuario={setusuario} />}>Logar</button>
        </>
    )
}