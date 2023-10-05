import axios from "axios";
import { ITopico } from "../Pages/TopicosPage";

export interface Topico {
    id: number;
    titulo: string;
    descricao: string;
    likes: number;
    dislikes: number;
}

async function getTopicos() {
    const response = await axios.get<Topico[]>("http://localhost:3000/topicos");
    return response.data;
}

async function getTopico(id: number) {
    const response = await axios.get<Topico>(`http://localhost:3000/topicos/${id}`);
    return response.data;
}

async function CreateTopico(topico: ITopico) {
    const response = await axios.post<Topico>("http://localhost:3000/topicos", topico);
    return response.data;
}

async function UpdateTopico(topico: ITopico) {
    const response = await axios.put<Topico>(`http://localhost:3000/topicos/${topico.id}`, topico);
    return response.data;
}

export { getTopicos, getTopico, CreateTopico, UpdateTopico };