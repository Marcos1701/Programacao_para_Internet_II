import './App.css'

import { RouterProvider } from 'react-router-dom'
import { TasksProvider } from './Providers/TasksProvider/index';
import { AppRoutes } from './routes';


function App() {

  return (
    <TasksProvider>
      <RouterProvider router={AppRoutes()} />
    </TasksProvider>
  )
}

export default App
