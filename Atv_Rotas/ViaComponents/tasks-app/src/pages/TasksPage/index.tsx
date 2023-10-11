import React, { useEffect } from 'react'
import { Action, ActionType } from '../../reducers/task_reducer'
import { useTasksDispatch } from '../../EncapsulatedContext'
import { TaskList } from './components/TaskList'
import { Link } from 'react-router-dom'

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

  console.log('Page renderizada!')

  return (
    <main>
      <Link to="add-task">Nova Tarefa</Link>
      <TaskList />
    </main>
  )
}