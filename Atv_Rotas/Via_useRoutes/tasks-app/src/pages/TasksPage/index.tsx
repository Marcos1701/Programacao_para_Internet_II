import React, { useEffect } from 'react'
import { Action, ActionType } from '../../reducers/task_reducer'
import { useTasksDispatch } from '../../EncapsulatedContext'
import { Link } from 'react-router-dom'
import { TaskList } from './components/TaskList'

export interface Task {
  id: string
  name: string
  description?: string
  done: boolean
  created_at: Date
}

export function TasksPage() {

  const dispatch: React.Dispatch<Action> = useTasksDispatch();

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: ActionType.LOADED, payload: { tasks: data } })
      })
  }, [])

  return (
    <main>
      <Link to="add-task">Nova Tarefa</Link>
      <TaskList />
    </main>
  )
}