import { RefObject, useRef, useState } from "react";
import { Usuario } from "..";

interface CadastroProps {
    realizarCadastro: (usuario: Usuario) => void
    usuarios: Usuario[]
}

export function Cadastro({ realizarCadastro, usuarios }: CadastroProps) {

    const nome: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const senha: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const cidade: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const pais: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const [erro, setErro] = useState<string>('')

    const Cadastrar = () => {
        if (!nome.current?.value || !senha.current?.value || !cidade.current?.value || !pais.current?.value) {
            setErro('Preencha todos os campos')
            return;
        }
        const usuario = usuarios.find(usuario => usuario.nome === nome.current?.value)

        if (usuario) {
            setErro('Usuario já cadastrado')
            return;
        }
        realizarCadastro({
            nome: nome.current?.value,
            senha: senha.current?.value,
            cidade: cidade.current?.value,
            pais: pais.current?.value
        })
        setErro('')
    }

    return (
        <>
            <input type="text" placeholder="Nome" ref={nome} />
            <input type="password" placeholder="Senha" ref={senha} />
            <input type="text" placeholder="Cidade" ref={cidade} />
            <input type="text" placeholder="Pais" ref={pais} />
            <button onClick={Cadastrar}>Cadastrar</button>
            {erro && <p>{erro}</p>}
        </>
    )
}
