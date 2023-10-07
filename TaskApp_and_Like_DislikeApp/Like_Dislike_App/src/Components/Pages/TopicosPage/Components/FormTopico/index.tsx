import { useRef, useState } from "react"
import './index.css'
import { Action, ActionType } from "../../../../../services/TopicosReducer";
import { useTopicosDispatch } from "../../../../../EncapsulatedContext/useTopicosDispatch";
import { ITopico } from "../..";
import { ulid } from "ulid";
import { CreateTopico } from "../../../../../services/api";

//(id:uuid | int, descricao: string, autor:Autor[nome, cidade, pais]

export function FormTopicos() {

    const dispatch: React.Dispatch<Action> = useTopicosDispatch();

    const addTopico = (descricao: string, nomeAutor: string, cidade: string, pais: string) => {
        const new_topico: ITopico = {
            id: ulid(),
            descricao,
            autor: {
                id: ulid(),
                nome: nomeAutor,
                cidade,
                pais
            },
            created_at: new Date(),
            tags: [],
            active: true,
            votos: []
        }

        CreateTopico(new_topico).then(topico => {
            dispatch({ type: ActionType.ADDED, payload: { topico } })
        })
    }

    const descricao: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const nomeAutor: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const cidade: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const pais: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (descricao.current?.value && nomeAutor.current?.value && cidade.current?.value && pais.current?.value) {
            addTopico(descricao.current.value, nomeAutor.current.value, cidade.current.value, pais.current.value)
            const form = event.target as HTMLFormElement
            form.reset()
            setError(false)
            setErrorMessage('')
            return;
        }

        setError(true)
        setErrorMessage('Preencha todos os campos!!')
    }

    return (
        <form onSubmit={onSubmit} id="formTopicos">

            <h2>Adicionar Tópico</h2>
            {error && <p>{errorMessage}</p>}
            <input type="text" placeholder="Digite a Descrição do Tópico" ref={descricao} />
            <input type="text" placeholder="Digite o nome do Autor" ref={nomeAutor} />
            <input type="text" placeholder="Digite a cidade do Autor" ref={cidade} />
            <input type="text" placeholder="Digite o país do Autor" ref={pais} />

            <div className="botoes">
                <button type="submit">Adicionar</button>
                <button type="reset">Limpar</button>
            </div>
        </form>
    )
}