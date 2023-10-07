import { useContext } from "react";
import { TopicosContext } from "../../Contexts";


export function useTopicos() {
    return useContext(TopicosContext);
}