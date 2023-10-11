import { createContext } from "react";
import { Task } from "../pages/TasksPage";
import { Action } from "../reducers/task_reducer";

export const TasksContext = createContext<Task[]>([]);
export const TasksDispatchContext = createContext<React.Dispatch<Action>>(() => { });