import { useState } from "react";
import { Cadastro } from "./Cadastro";
import { Login } from "./Login";

interface AcessoProps {
    setusuario: (usuario: Usuario) => void
}

enum operacao {
    nenhuma,
    Cadastro,
    Login
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

    let [tipoOperacao, setTipoOperacao] = useState<operacao>(operacao.nenhuma)


    return (
        <>
            { !tipoOperacao && <> 
            <h2>Selecione uma opção</h2>
            <button onClick={() => setTipoOperacao(operacao.Cadastro)}>Realizar Cadastro</button>
            <button onClick={() => setTipoOperacao(operacao.Login)}>Realizar Login</button>
            </>
            }

            {tipoOperacao == operacao.Cadastro && <Cadastro realizarCadastro={realizarCadastro} usuarios={usuarios} key='sla' /> }
            {tipoOperacao == operacao.Login && <Login usuarios={usuarios} setusuario={setusuario} key = 'sla'/> }

        </>
    )
}