import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Task } from "../TasksPage";

export function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/tasks/${id}`)
      .then(response => {
        if (!response.ok) {
          alert('Tarefa não encontrada!');
          return <Navigate to="/tasks" />
        }
        return response.json()
      })
      .then(data => {
        setTask(data)
      })
  }, []);


  return (
    <main>
      <h1>Detalhes da Tarefa</h1>
      <p>Nome: {task?.name}</p>
      <p>Descrição: {task?.description}</p>
      <p>Feito: {task?.done ? 'Sim' : 'Não'}</p>
    </main>
  )
}