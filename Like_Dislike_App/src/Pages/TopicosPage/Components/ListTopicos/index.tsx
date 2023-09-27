import { IAutor, ITopico, Voto } from '../../'

interface ListTopicosProps {
    Topicos: ITopico[]
    current_user: IAutor
    Like: (id: string) => void
    Dislike: (id: string) => void
}

export function ListTopicos({ Topicos, current_user, Like, Dislike }: ListTopicosProps) {
    return (
        <ul>
            {Topicos.map(topico => <li key={topico.id}>
                <p key={topico.id + '-desc'}>{topico.descricao}</p>

                <p key={topico.id + '-tags'}>
                    Tags: {topico.tags.map(tag => tag + ' ')}
                </p>

                <p key={topico.id + '-data'}>
                    Data: {topico.created_at.toLocaleDateString()}
                </p>

                <p key={topico.id + '-active'}>
                    Status: {topico.active ? 'Ativo' : 'Inativo'}
                </p>

                <p key={topico.id + '-autor'}>
                    Autor: {topico.autor.nome}
                </p>

                {topico.autor.nome === current_user.nome ?
                    <p key={topico.id + '-like'}>
                        Likes: {
                            topico.votos.filter(voto => voto.tipo === Voto.UP).length -
                            topico.votos.filter(voto => voto.tipo === Voto.DOWN).length
                        }
                    </p> :
                    <p key={topico.id + '-like'}>
                        Likes: {
                            topico.votos.filter(voto => voto.tipo === Voto.UP).length -
                            topico.votos.filter(voto => voto.tipo === Voto.DOWN).length
                        } <button onClick={() => Like(topico.id)}>Like</button>
                    </p>
                }

                {topico.autor.nome === current_user.nome ?
                    <p key={topico.id + '-dislike'}>
                        Dislikes: {
                            topico.votos.filter(voto => voto.tipo === Voto.DOWN).length -
                            topico.votos.filter(voto => voto.tipo === Voto.UP).length
                        }
                    </p> :
                    <p key={topico.id + '-dislike'}>
                        Dislikes: {
                            topico.votos.filter(voto => voto.tipo === Voto.DOWN).length -
                            topico.votos.filter(voto => voto.tipo === Voto.UP).length
                        } <button onClick={() => Dislike(topico.id)}>Dislike</button>
                    </p>
                }

                {topico.autor.nome === current_user.nome &&
                    <>
                        <button key={topico.id + 'active'}>Ativar/Desativar</button>
                        <button key={topico.id + '-delete'}>Deletar</button>

                    </>
                }
            </li>
            )}
        </ul>
    )
}