import { ulid } from "ulid";
import { ITopico, Voto } from "../.."
import { useTopicos } from "../../../../../EncapsulatedContext/useTopicos"
import { useTopicosDispatch } from "../../../../../EncapsulatedContext/useTopicosDispatch";
import { Action, ActionType } from "../../../../../services/TopicosReducer";
import './index.css'
import { UpdateTopico } from "../../../../../services/api";

interface TopicoProps {
    topico: ITopico
}

export function Topico({ topico }: TopicoProps) {

    const Topicos: ITopico[] = useTopicos();
    const dispatch: React.Dispatch<Action> = useTopicosDispatch();
    const Like = (id: string) => {
        const topico = Topicos.find(topico => topico.id === id)
        if (topico) {
            topico.votos.push({ id: ulid(), topico_id: id, tipo: Voto.UP })
            dispatch({ type: ActionType.UPDATED, payload: { topico } })
            UpdateTopico(topico).catch(() => {
                topico.votos.pop()
                dispatch({ type: ActionType.UPDATED, payload: { topico } })
            });
        }
    }

    const Dislike = (id: string) => {
        const topico = Topicos.find(topico => topico.id === id)
        if (topico) {
            topico.votos.push({ id: ulid(), topico_id: id, tipo: Voto.DOWN })
            dispatch({ type: ActionType.UPDATED, payload: { topico } })
            UpdateTopico(topico).catch(() => {
                topico.votos.pop()
                dispatch({ type: ActionType.UPDATED, payload: { topico } })
            });
        }
    }

    const likes = topico.votos.filter(voto => voto.tipo === Voto.UP).length
    const dislikes = topico.votos.filter(voto => voto.tipo === Voto.DOWN).length

    return (
        <li key={topico.id} style={{
            border: likes > dislikes ? '2px solid green' :
                likes < dislikes ? '2px solid red' : '2px solid black',
            backgroundColor: likes > dislikes ? 'rgba(0, 255, 0, 0.2)' :
                likes < dislikes ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.2)'
        }}>
            <div className="content">
                <p key={topico.id + '-desc'} className="descricao">"{topico.descricao}"</p>

                <span id="informacoes_extras">
                    <p key={topico.id + '-data'} className="data_publicacao">
                        publicado em: {topico.created_at.toLocaleDateString()}
                    </p>

                    <p key={topico.id + '-autor'} className="autor">
                        Autor: {topico.autor.nome}
                    </p>
                </span>

            </div>
            <div className="valores">
                <p className='qtd-likes'>
                    Likes: {likes}
                </p>

                <p className='qtd-dislikes'>
                    Dislikes: {dislikes}
                </p>
            </div>

            <div className="resultado">
                <button key={topico.id + '-like'} onClick={() => Like(topico.id)}>Like</button>
                <div className="retornoVisual" key={topico.id + '-retornoVisual'}>
                    {likes == 0 && dislikes == 0 ?
                        <>
                            <div className="like" style={{ width: '50%' }}><p>50%</p></div>
                            <div className="dislike" style={{ width: '50%' }}><p>50%</p></div>
                        </>
                        :
                        <>
                            <div className="like" style={{
                                width: likes > 0 ?
                                    likes / (likes + dislikes) * 100 + '%' : '0%'
                            }}>
                                <p>{likes > 0 ? (likes / (likes + dislikes) * 100).toFixed(0) + '%' : '0%'}</p>
                            </div>
                            <div className="dislike" style={{ width: dislikes > 0 ? dislikes / (likes + dislikes) * 100 + '%' : '0%' }}>
                                <p>{dislikes > 0 ? (dislikes / (likes + dislikes) * 100).toFixed(0) + '%' : '0%'}</p>
                            </div>
                        </>
                    }
                </div>


                <button key={topico.id + '-dislike'} onClick={() => Dislike(topico.id)}>Dislike</button>
            </div>
            <div className="Saldo" key={topico.id + '-saldo'}>
                <label htmlFor="saldo">Saldo:</label>
                <p className="saldo">{likes - dislikes}</p>
            </div>
        </li>
    )
}