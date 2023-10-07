import React, { useEffect, useReducer } from 'react'
import { ulid } from 'ulidx'
import { Action, ActionType, TaskReducer } from '../../reducers/task_reducer'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { useTasksDispatch } from '../../EncapsulatedContext'

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
    <>
      <TaskForm />
      <TaskList />
    </>
  )
}