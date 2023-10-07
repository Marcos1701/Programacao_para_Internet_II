import { useEffect } from "react";
import { ListTopicos } from "./Components/ListTopicos";
import { Header } from "./Components/Header";
import { ActionType, Action } from "../../../services/TopicosReducer";
import { useTopicosDispatch } from "../../../EncapsulatedContext/useTopicosDispatch";
import { getTopicos } from "../../../services/api";

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
    const dispatch: React.Dispatch<Action> = useTopicosDispatch();

    useEffect(() => {
        getTopicos().then((topicos: ITopico[]) => {
            dispatch({ type: ActionType.LOADED, payload: { topicos } })
        })
    }, [])

    return (
        <>
            <Header />
            <ListTopicos />
        </>
    )
}

//  para rodar o json-server
//  json-server --watch Database/db.json --port 3000