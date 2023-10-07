import './App.css'
import { TopicosPage } from './Components/Pages/TopicosPage'
import { TopicosProvider } from './Providers/TopicosProvider'


function App() {
  return (
    <TopicosProvider >
      <TopicosPage />
    </TopicosProvider>
  )
}

export default App
