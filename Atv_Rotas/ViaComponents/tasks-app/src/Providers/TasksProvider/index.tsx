import { ReactNode, useReducer } from "react";
import { TaskReducer } from "../../reducers/task_reducer";
import { TasksContext, TasksDispatchContext } from '../../contexts/TasksContext';


export function TasksProvider({ children }: { children: ReactNode }) {
    const [{ tasks }, dispatch] = useReducer(TaskReducer, { tasks: [] })

    return (
        <TasksContext.Provider value={tasks} >
            <TasksDispatchContext.Provider value={dispatch} >
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}