import { useState } from 'react'
import './App.css'
import { TopicosPage } from './Pages/TopicosPage'
import { Acesso, Usuario } from './Pages/Acesso'


function App() {

  const [current_user, setCurrentUser] = useState<Usuario | null>(null)

  if (current_user) {
    return <TopicosPage current_user={{
      id: current_user.id,
      nome: current_user.nome,
      cidade: current_user.cidade,
      pais: current_user.pais
    }} setCurrentUser={setCurrentUser} />
  }

  return <Acesso setusuario={setCurrentUser} />
}

export default App
