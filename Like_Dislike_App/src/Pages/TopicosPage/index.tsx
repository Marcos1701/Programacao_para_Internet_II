import React from "react";
import { ListTopicos } from "./Components/ListTopicos";

//(id:uuid | int, descricao: string, autor:Autor[nome, cidade, pais]

export interface IAutor{
    nome: string
    cidade: string
    pais: string
}

export interface ITopico{
    id: string
    descricao: string
    autor: IAutor

}


export function TopicosPage(){

    const Topicos: ITopico[] = []

    return (
        <>
        <ListTopicos Topicos={Topicos}/>
        </>
    )    
}