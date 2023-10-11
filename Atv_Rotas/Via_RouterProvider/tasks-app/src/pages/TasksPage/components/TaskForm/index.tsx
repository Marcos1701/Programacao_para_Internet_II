import React, { useRef } from 'react'
import { useTasksDispatch } from '../../../../EncapsulatedContext';
import { ActionType } from '../../../../reducers/task_reducer';
import { ulid } from 'ulidx';
import { Navigate } from 'react-router-dom';
import { Footer } from '../../../../components/Footer';
import { Header } from '../../../../components/Header';

export function TaskForm() {

  const descriptionInputRef = useRef<HTMLInputElement>(null)

  const dispatch = useTasksDispatch();
  const [added, setAdded] = React.useState(false);

  const onAdd = async (text: string) => {
    dispatch({ type: ActionType.ADDED, payload: { task: { id: ulid(), name: text, done: false, created_at: new Date() } } })

    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: ulid(),
        name: text,
        description: '',
        done: false,
        created_at: new Date()
      })
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = descriptionInputRef.current!.value

    const form = (event.target as HTMLFormElement)
    form.reset()
    descriptionInputRef.current!.focus()

    onAdd(text);
  }


  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <input type="text" ref={descriptionInputRef} placeholder="Descrição da Task" />
        <input type="submit" value="Adicionar Tarefa"
          onClick={() => {
            alert('Tarefa adicionada com sucesso!')
            setAdded(true)
          }} />

        {added && <Navigate to="/tasks" />}
      </form>
      <Footer />
    </>
  )
}