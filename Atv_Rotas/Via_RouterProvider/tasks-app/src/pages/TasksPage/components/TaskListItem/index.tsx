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

  const onSave = async (task: Task) => {
    await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    }).then(response => {
      if (!response.ok) {
        alert('Erro ao atualizar a tarefa!')
        return
      }
      dispatch({ type: ActionType.UPDATED, payload: { task } })
    })

  }

  const onRemove = async (task: Task) => {
    await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        alert('Erro ao remover a tarefa!')
        return
      }
      dispatch({ type: ActionType.REMOVED, payload: { id: task.id } })
    })
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