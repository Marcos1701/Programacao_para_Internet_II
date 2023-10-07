import { ReactNode, useReducer } from "react";
import { reducer } from "../../reducers/task_reducer";
import { TasksContext, TasksDispatchContext } from '../../Contexts/index';


export function TasksProvider({ children }: { children: ReactNode }) {
    const [{ tasks }, dispatch] = useReducer(reducer, { tasks: [] })

    return (
        <TasksContext.Provider value={tasks} >
            <TasksDispatchContext.Provider value={dispatch} >
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}