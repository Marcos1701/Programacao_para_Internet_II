import { ITopico } from "../Pages/TopicosPage";

export interface TopicoState {
    topicos: ITopico[]
}

export enum ActionType { ADDED, UPDATED, REMOVED, LOADED }

type ActionAdded = { type: ActionType.ADDED, payload: { topico: ITopico } }
type ActionUpdated = { type: ActionType.UPDATED, payload: { topico: ITopico } }
type ActionRemoved = { type: ActionType.REMOVED, payload: { id: number } }
type ActionLoaded = { type: ActionType.LOADED, payload: { topicos: ITopico[] } }

export type Action = ActionAdded | ActionUpdated | ActionRemoved | ActionLoaded


export function reducer(state: TopicoState, action: Action): TopicoState {

    switch (action.type) {
        case ActionType.ADDED: {
            const new_topico = action.payload.topico
            return { topicos: [new_topico, ...state.topicos] }
        }
        case ActionType.UPDATED: {
            const topico_updated = action.payload.topico
            const topicos = state.topicos.filter(topico =>
                topico.id === topico_updated.id ? topico_updated : topico
            )

            return { topicos }
        }
        case ActionType.LOADED: {
            return { topicos: [...action.payload.topicos] }
        }
        default: {
            console.warn('Action Inválida')
            return state
        }

    }

}