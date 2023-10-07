import axios from "axios";
import { ITopico } from "../Pages/TopicosPage";


async function getTopicos() {
    const response = await axios.get<ITopico[]>("http://localhost:3000/topico");
    for (const topico of response.data) {
        topico.created_at = new Date(topico.created_at);
    }
    return response.data;
}

async function getTopico(id: number) {
    const response = await axios.get<ITopico>(`http://localhost:3000/topico/${id}`);
    response.data.created_at = new Date(response.data.created_at);
    return response.data;
}

async function CreateTopico(topico: ITopico) {
    const response = await axios.post<ITopico>("http://localhost:3000/topico", topico);
    response.data.created_at = new Date(response.data.created_at);
    return response.data;
}

async function UpdateTopico(topico: ITopico) {
    const response = await axios.put<ITopico>(`http://localhost:3000/topico/${topico.id}`, topico);
    response.data.created_at = new Date(response.data.created_at);
    return response.data;
}

export { getTopicos, getTopico, CreateTopico, UpdateTopico };