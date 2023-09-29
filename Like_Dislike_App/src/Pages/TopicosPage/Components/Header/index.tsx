import { useState } from "react"
import { FormTopicos } from "../FormTopico"

interface HeaderProps {
    addTopico: (descricao: string, nomeAutor: string, cidade: string, pais: string) => void
}

export function Header({ addTopico }: HeaderProps) {
    const [ExibirForm, setExibirForm] = useState<boolean>(false)

    return (
        <div>
            <h1>Aplicação de Like e Dislike <strong style={{
                color: 'red',
                fontSize: '2rem'
            }}>"Simples"</strong></h1>
            {ExibirForm ? <FormTopicos AddElement={addTopico} /> :
                <p>Para adicionar um tópico, clique no botão abaixo</p>}
            <button onClick={() => setExibirForm(!ExibirForm)}>{ExibirForm ? 'Fechar Aba' : 'Adicionar Tópico'}</button>
        </div>
    )
}