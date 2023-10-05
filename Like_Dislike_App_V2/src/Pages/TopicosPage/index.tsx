import React, { useEffect, useReducer } from "react";
import { ListTopicos } from "./Components/ListTopicos";
import { ulid } from "ulid";
import { Header } from "./Components/Header";
import { ActionType, reducer } from "../../services/TopicosReducer";
import axios from "axios";

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
        axios.get('http://localhost:3001/topicos').then(response => {
            dispatch({ type: ActionType.LOADED, payload: response.data })
        })
    }, [])

    const Like = (id: string) => {
        const topico = topicos.find(topico => topico.id === id)
        if (topico) {
            topico.votos.push({ id: ulid(), topico_id: id, tipo: Voto.UP })
            axios.put(`http://localhost:3001/topicos/${id}`, {
                ...topico
            }).then(response => {
                dispatch({ type: ActionType.UPDATED, payload: response.data })
            })
        }
    }

    const Dislike = (id: string) => {
        const topico = topicos.find(topico => topico.id === id)
        if (topico) {
            topico.votos.push({ id: ulid(), topico_id: id, tipo: Voto.DOWN })
            axios.put(`http://localhost:3001/topicos/${id}`, {
                ...topico
            }).then(response => {
                dispatch({ type: ActionType.UPDATED, payload: response.data })
            })
        }
    }

    const AddTopico = (descricao: string, nomeAutor: string, cidade: string, pais: string) => {
        const topico: ITopico = {
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

        axios.post('http://localhost:3001/topicos', {
            ...topico
        }).then(response => {
            dispatch({ type: ActionType.ADDED, payload: response.data })
        })
    }

    return (
        <>
            <Header addTopico={AddTopico} />
            <ListTopicos Topicos={topicos} Like={Like} Dislike={Dislike} />
        </>
    )
}