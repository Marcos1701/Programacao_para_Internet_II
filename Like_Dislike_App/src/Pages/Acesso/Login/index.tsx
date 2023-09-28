import { useState } from "react";
import { Usuario } from "..";

interface LoginProps {
    usuarios: Usuario[]
    setusuario: (usuario: Usuario) => void
}

export function Login({ usuarios, setusuario }: LoginProps) {

    const [nome, setNome] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [erro, setErro] = useState<string>('')

    const Logar = () => {
        const usuario = usuarios.find(usuario => usuario.nome === nome && usuario.senha === senha)
        if (usuario) {
            setusuario(usuario)
            return;
        }
        setErro('Usuario ou senha incorretos')
    }

    return (
        <>
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button onClick={Logar}>Logar</button>
            {erro && <p>{erro}</p>}
        </>
    )
}