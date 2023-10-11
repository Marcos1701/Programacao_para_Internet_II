import { useEffect, useMemo, useRef, useState } from "react"
import { Task } from "../.."
import { Link } from "react-router-dom"
import { useTasksDispatch } from "../../../../EncapsulatedContext"
import { Action, ActionType } from "../../../../reducers/task_reducer"

interface TaskListItemProps {
  task: Task
}

export function TaskListItem({ task }: TaskListItemProps) {

  const [isEditing, setIsEditing] = useState(false)
  const refInput = useRef<HTMLInputElement>(null)
  const refDone = useRef<HTMLInputElement>(null)

  const dispatch: React.Dispatch<Action> = useTasksDispatch();

  const onSave = (task: Task) => {
    dispatch({ type: ActionType.ADDED, payload: { task } })
  }

  const onRemove = (task: Task) => {
    dispatch({ type: ActionType.REMOVED, payload: { id: task.id } })
  }

  const handleRemove = () => { onRemove(task) }

  const handleSaveOrEdit = () => {

    if (isEditing) {
      setIsEditing(false)
      task.name = refInput.current!.value;
      onSave(task)
    } else {
      setIsEditing(true)
    }

  }

  const handleChangeDone = () => {
    task.done = refDone.current!.checked;
    onSave(task);
  }

  useEffect(() => {
    refDone.current!.checked = task.done;
  }, [])

  useEffect(() => {
    if (isEditing) {
      refInput.current!.value = task.name
      refInput.current!.focus()
    }
  }, [isEditing])

  const labelBtnEditar = useMemo(() => {
    return isEditing ? 'Salvar' : 'Editar'
  }, [isEditing])

  console.log('Item renderizado!')

  return (
    <li style={{ listStyle: "none" }}>
      <div style={{ display: "flex", gap: 10 }}>
        <input type="checkbox" ref={refDone} onChange={handleChangeDone} />

        {isEditing ? <input ref={refInput} /> :
          <Link to={`detail-task/${task.id}`}>
            {task.name}
          </Link>
        }

        <button onClick={handleSaveOrEdit}>{labelBtnEditar}</button>
        <button onClick={handleRemove}>Lixeira</button>
      </div>
    </li>)
}