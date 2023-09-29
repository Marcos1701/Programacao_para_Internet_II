import { ITopico } from '../../'
import { Topico } from '../Topico'

interface ListTopicosProps {
    Topicos: ITopico[]
    Like: (id: string) => void
    Dislike: (id: string) => void
}

export function ListTopicos({ Topicos, Like, Dislike }: ListTopicosProps) {
    return (
        <ul>
            {Topicos.map(topico => <Topico key={topico.id} topico={topico} Like={Like} Dislike={Dislike} />)}
        </ul>
    )
}