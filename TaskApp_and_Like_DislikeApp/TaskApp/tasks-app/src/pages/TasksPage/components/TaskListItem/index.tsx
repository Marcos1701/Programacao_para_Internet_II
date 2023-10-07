import React, { useEffect, useMemo, useRef, useState } from "react"
import { Task } from "../.."
import { Action, ActionType } from "../../../../reducers/task_reducer";
import { useTasksDispatch } from "../../../../EncapsulatedContext";

interface TaskListItemProps {
  task: Task
}

export function TaskListItem({ task }: TaskListItemProps) {

  const dispatch: React.Dispatch<Action> = useTasksDispatch();

  const onRemove = (task: Task) => {
    dispatch({ type: ActionType.REMOVED, payload: { id: task.id } })
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE'
    }).catch(error => console.log(error))
  }

  const onSave = (task: Task) => {
    dispatch({ type: ActionType.UPDATED, payload: { task } })
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(error => console.log(error))
  }

  const [isEditing, setIsEditing] = useState(false)
  const refInput = useRef<HTMLInputElement>(null)
  const refDone = useRef<HTMLInputElement>(null)

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
          <p>
            {task.name}
          </p>
        }

        <button onClick={handleSaveOrEdit}>{labelBtnEditar}</button>
        <button onClick={handleRemove}>Lixeira</button>
      </div>
    </li>)
}