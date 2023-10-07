import { useState } from "react"
import { FormTopicos } from "../FormTopico"
import './index.css'


export function Header() {
    const [ExibirForm, setExibirForm] = useState<boolean>(false)

    return (
        <div>
            <h1>Aplicação de Like e Dislike <strong>"Simples"</strong></h1>
            {ExibirForm ? <FormTopicos /> :
                <p>Para adicionar um tópico, clique no botão abaixo</p>}
            <button onClick={() => setExibirForm(!ExibirForm)}>{ExibirForm ? 'Fechar Aba' : 'Adicionar Tópico'}</button>
        </div>
    )
}