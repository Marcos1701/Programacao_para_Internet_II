import { Task } from "../.."
import { useTasks } from "../../../../EncapsulatedContext"
import { TaskListItem } from "../TaskListItem"


const TaskList = () => {
  const tasks: Task[] = useTasks();

  console.log('Lista renderizada!')

  return (
    <>
      <h3>{tasks.length} Tarefas cadastradas</h3>
      <ul>
        {tasks.map(task => <TaskListItem key={task.id} task={task} />)}
      </ul>
    </>
  )
}

export { TaskList }
