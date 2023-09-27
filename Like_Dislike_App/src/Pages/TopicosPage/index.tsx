import React from "react";
import { ListTopicos } from "./Components/ListTopicos";
import { Acesso } from "../Acesso";

//Tópico(id:uuid | int, descricao: string, autor:Autor[nome, cidade, pais], created_at:date, tags:string[], active:bool)

export interface IAutor {
    nome: string
    cidade: string
    pais: string
}

export enum Voto {
    UP, DOWN
}

export interface IVoto {
    id: string
    autor: IAutor
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
    const [current_user, setCurrentUser] = React.useState<IAutor>()
    const [Votos, setVotos] = React.useState<IVoto[]>([])

    const Like = (id: string) => {
        const voto = Votos.find(voto => voto.topico_id === id && voto.autor.nome === current_user?.nome)
        if (voto) {
            if (voto.tipo === Voto.UP) {
                setVotos(Votos.filter(voto => voto.topico_id !== id && voto.autor.nome !== current_user?.nome))
                return;
            }
            setVotos(Votos.map(voto => voto.topico_id === id && voto.autor.nome === current_user?.nome ? { ...voto, tipo: Voto.UP } : voto))
            return;
        }
        setVotos([...Votos, { id: id, autor: current_user!, topico_id: id, tipo: Voto.UP }])
    }

    const Dislike = (id: string) => {
        const voto = Votos.find(voto => voto.topico_id === id && voto.autor.nome === current_user?.nome)
        if (voto) {
            if (voto.tipo === Voto.DOWN) {
                setVotos(Votos.filter(voto => voto.topico_id !== id && voto.autor.nome !== current_user?.nome))
                return;
            }
            setVotos(Votos.map(voto => voto.topico_id === id && voto.autor.nome === current_user?.nome ? { ...voto, tipo: Voto.DOWN } : voto))
            return;
        }
        setVotos([...Votos, { id: id, autor: current_user!, topico_id: id, tipo: Voto.DOWN }])
    }


    return (
        <>
            {
                current_user ?
                    <ListTopicos Topicos={Topicos} current_user={current_user} Like={Like} Dislike={Dislike} /> :
                    <Acesso setusuario={setCurrentUser} />
            }
        </>
    )
}