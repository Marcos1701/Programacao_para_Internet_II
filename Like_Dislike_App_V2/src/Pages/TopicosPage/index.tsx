import { useEffect, useReducer } from "react";
import { ListTopicos } from "./Components/ListTopicos";
import { ulid } from "ulid";
import { Header } from "./Components/Header";
import { ActionType, reducer } from "../../services/TopicosReducer";
import { CreateTopico, UpdateTopico, getTopicos } from "../../services/api";

//Tópico(id:uuid | int, descricao: string, autor:Autor[nome, cidade, pais], created_at:date, tags:string[], active:bool)

export interface IAutor {
    id: string
    nome: string
    cidade: string
    pais: string
}


export enum Voto {
    UP, DOWN
}

export interface IVoto {
    id: string
    topico_id: string
    tipo: Voto
}

export interface ITopico {
    id: string
    descricao: string
    autor: IAutor
    created_at: Date
    tags: string[]
    active: boolean
    votos: IVoto[]
}


export function TopicosPage() {
    const [{ topicos }, dispatch] = useReducer(reducer, { topicos: [] })

    useEffect(() => {
        getTopicos().then(topicos => {
            dispatch({ type: ActionType.LOADED, payload: { topicos } })
        })
    }, [])

    const Like = (id: string) => {
        const topico = topicos.find(topico => topico.id === id)
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
        const topico = topicos.find(topico => topico.id === id)
        if (topico) {
            topico.votos.push({ id: ulid(), topico_id: id, tipo: Voto.DOWN })
            dispatch({ type: ActionType.UPDATED, payload: { topico } })
            UpdateTopico(topico).catch(() => {
                topico.votos.pop()
                dispatch({ type: ActionType.UPDATED, payload: { topico } })
            });
        }
    }

    const AddTopico = (descricao: string, nomeAutor: string, cidade: string, pais: string) => {
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

    return (
        <>
            <Header addTopico={AddTopico} />
            <ListTopicos Topicos={topicos} Like={Like} Dislike={Dislike} />
        </>
    )
}

//  para rodar o json-server
//  json-server --watch Database/db.json --port 3000