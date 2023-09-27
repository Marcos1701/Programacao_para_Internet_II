import {ITopico} from '../../'

interface ListTopicosProps{
    Topicos: ITopico[]
}

export function ListTopicos({ Topicos }: ListTopicosProps){
    return (
        <ul>
            {Topicos.map(topico => <li key={topico.id}>
                <p key={topico.id + '-desc'}>{topico.descricao}</p>

                <p key={topico.id + '-autor'}>
                   Autor: {topico.autor.nome} 
                </p>
                </li>
                )}
        </ul>
    )
}