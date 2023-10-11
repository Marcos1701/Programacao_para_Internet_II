import React, { useRef } from 'react'
import { useTasksDispatch } from '../../../../EncapsulatedContext';
import { ActionType } from '../../../../reducers/task_reducer';
import { ulid } from 'ulidx';
import { redirect } from 'react-router-dom';

export function TaskForm() {

  const descriptionInputRef = useRef<HTMLInputElement>(null)

  const dispatch = useTasksDispatch();

  const onAdd = (text: string) => {
    console.log('Adicionando tarefa: ', text)
    dispatch({ type: ActionType.ADDED, payload: { task: { id: ulid(), name: text, done: false, created_at: new Date() } } })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = descriptionInputRef.current!.value

    const form = (event.target as HTMLFormElement)
    form.reset()
    descriptionInputRef.current!.focus()

    onAdd(text);
    redirect('/tasks');
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={descriptionInputRef} placeholder="Descrição da Task" />
      <input type="submit" value="Adicionar Tarefa" />
    </form>
  )
}