import { useMemo } from 'react'
import './App.css'
import { useAuth } from './contexts/AuthContext'

import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import { TasksProvider } from './Providers/TasksProvider/index';
import { AppRoutes } from './routes';


function App() {
  const { signout, isAuthenticated, user } = useAuth()

  const authBlock = useMemo(() => {
    return (
      isAuthenticated ?
        <p>{user!.username}
          <button onClick={() => { signout() }}>Sair</button>
        </p>
        : <p>Olá Visitante!</p>)
  }, [isAuthenticated])



  return (
    <div>
      <Router>
        <header>
          <h1>Tasks App</h1>
          <span>
            {authBlock}
          </span>
          <nav>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/tasks">Tasks</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/sobre">Sobre</NavLink></li>
            </ul>
          </nav>
        </header>

        <TasksProvider>
          <AppRoutes />
        </TasksProvider>

        <footer>
          <p>Fim por fim feito por mim!</p>
        </footer>
      </Router>

    </div >
  )
}

export default App
