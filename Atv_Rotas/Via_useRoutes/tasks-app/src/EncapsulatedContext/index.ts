import { useContext } from "react"
import { TasksContext, TasksDispatchContext } from "../contexts/TasksContext"

export const useTasks = () => {
    return useContext(TasksContext)
}

export const useTasksDispatch = () => {
    return useContext(TasksDispatchContext)
}