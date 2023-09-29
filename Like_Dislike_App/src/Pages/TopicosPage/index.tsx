import React from "react";
import { ListTopicos } from "./Components/ListTopicos";
import { ulid } from "ulid";
import { Header } from "./Components/Header";

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
    const [Topicos, setTopicos] = React.useState<ITopico[]>([])

    const Like = (id: string) => {
        setTopicos(Topicos.map(topico => {
            if (topico.id === id) {
                topico.votos.push({ id: ulid(), topico_id: id, tipo: Voto.UP })
            }
            return topico
        }))
    }

    const Dislike = (id: string) => {
        setTopicos(Topicos.map(topico => {
            if (topico.id === id) {
                topico.votos.push({ id: ulid(), topico_id: id, tipo: Voto.DOWN })
            }
            return topico
        }))
    }

    const AddTopico = (descricao: string, nomeAutor: string, cidade: string, pais: string) => {
        setTopicos([...Topicos, {
            id: ulid(),
            descricao: descricao,
            autor: {
                id: ulid(),
                nome: nomeAutor,
                cidade: cidade,
                pais: pais
            },
            created_at: new Date(),
            tags: [],
            active: true,
            votos: []
        }])
    }

    return (
        <>
            <Header addTopico={AddTopico} />
            <ListTopicos Topicos={Topicos} Like={Like} Dislike={Dislike} />
        </>
    )
}