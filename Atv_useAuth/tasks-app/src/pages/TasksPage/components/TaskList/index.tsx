import { Task } from "../..";
import { useTasks } from "../../../../EncapsulatedContext";
import { TaskListItem } from "../TaskListItem";

export function TaskList() {
    const tasks: Task[] = useTasks();

    return (
        <>

            <h1>Lista de Tarefas</h1>
            <ul>
                {tasks.map(task => (
                    <TaskListItem key={task.id} task={task} />
                ))}
            </ul>
        </>
    )
}