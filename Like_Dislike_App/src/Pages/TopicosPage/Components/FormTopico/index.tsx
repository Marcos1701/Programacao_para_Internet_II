import { useRef } from "react"

interface FormTopicosProps{
    AddElement: () => void
}
//(id:uuid | int, descricao: string, autor:Autor[nome, cidade, pais]

export function FormTopicos({AddElement}: FormTopicosProps){

    const descricao: React.RefObject<HTMLInputElement>= useRef<HTMLInputElement>(null);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        AddElement()

    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Digite a Descrição do Tópico" ref={descricao}/>

            <button type="submit">Adicionar</button>
        </form>
    )
}