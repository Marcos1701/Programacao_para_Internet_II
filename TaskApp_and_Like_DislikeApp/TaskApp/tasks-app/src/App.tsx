import './App.css'
import { TasksProvider } from './Providers/TasksProvider'
import { TasksPage } from './pages/TasksPage'

function App() {

  return (
    <div>
      <header>Tasks App Web</header>
      <main>
        <TasksProvider>
          <TasksPage />
        </TasksProvider>
      </main>
      <footer>
        <p>Fim por fim feito por mim!</p>
      </footer>

    </div>
  )
}

export default App
