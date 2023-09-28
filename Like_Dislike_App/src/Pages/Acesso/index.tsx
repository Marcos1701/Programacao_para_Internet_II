import { useState } from "react";
import { Cadastro } from "./Cadastro";
import { Login } from "./Login";

interface AcessoProps {
    setusuario: (usuario: Usuario) => void
}

export interface Usuario {
    id: string
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
            <h2>Selecione uma opção</h2>
            <button onClick={() => <Cadastro realizarCadastro={realizarCadastro} usuarios={usuarios} />}>Cadastrar</button>
            <button onClick={() => <Login usuarios={usuarios} setusuario={setusuario} />}>Logar</button>
        </>
    )
}