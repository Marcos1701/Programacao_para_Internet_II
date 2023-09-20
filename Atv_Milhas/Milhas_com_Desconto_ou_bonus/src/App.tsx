import './App.css'
import Button from './Components/Button'
import { useState } from 'react';
import Input from './Components/Input';

function App() {

  const [qtd_Milhas, setMilhas] = useState(0)
  const [preco_milheiro, setPreco_milheiro] = useState(0)
  const [desconto, setDesconto] = useState(0)


  return (
    <>
      <div className='conteiner'>
        <header>
          <div className='exibir_calculo'>
            <Button id='Exibir_calculo' text='Calcular milhas com desconto!' />
          </div>
        </header>

        <main>
          <div className='Milhas'>
            <p>Milhas</p>
            <input id='Milhas' type='number' placeholder='' value={qtd_Milhas} />
            <Button id='inserir_1k' text='1k' onClick={() => setMilhas(qtd_Milhas + 1000)} />
            <Button id='inserir_10k' text='10k' onClick={() => setMilhas(qtd_Milhas + 10000)} />
            <Button id='remover_1k' text='1k' onClick={() => setMilhas(qtd_Milhas - 1000 > 0 ? qtd_Milhas - 1000 : 0)} />
            <Button id='remover_1k' text='10k' onClick={() => setMilhas(qtd_Milhas - 1000 > 0 ? qtd_Milhas - 10000 : 0)} />
          </div>

          <div className='Preco_milheiro'>
            <p>Preço Milheiro</p>
            <label htmlFor="preco_milheiro_input">R$ </label>
            <Input id='preco_milheiro_input' type='number' Initialvalue={0} />
          </div>

          <div className='Desconto'>
            <p>Desconto</p>
            <Input id='desconto_input' type='number' Initialvalue={0} />
            <label htmlFor="desconto_input"> %</label>
          </div>
        </main>
      </div>

    </>
  )
}

export default App
