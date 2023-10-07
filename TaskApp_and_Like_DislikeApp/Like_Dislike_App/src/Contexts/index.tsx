import { createContext } from "react";
import { ITopico } from "../Components/Pages/TopicosPage";
import { Action } from "../services/TopicosReducer";


export const TopicosContext = createContext<ITopico[]>([]);

export const TopicosDispatchContext = createContext<React.Dispatch<Action>>(() => { });