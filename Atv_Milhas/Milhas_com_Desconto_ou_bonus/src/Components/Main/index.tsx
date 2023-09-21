import { useState } from "react";
import Button from "../Button";
import Input from "../Input";

export function Main(){

    const [qtd_Milhas, setMilhas] = useState<number>(0)
    const [preco_milheiro, setPreco_milheiro] = useState(0)
    //const [desconto, setDesconto] = useState(0)

    return (
        <main>
          <div className='Milhas'>
            <p>Milhas</p>
            <input id='Milhas' type='string' placeholder='' value={qtd_Milhas} onChange={(event) => {
              const num: number = parseInt(event.target.value);
              if((!isNaN(num) && num >= 0)){
                setMilhas(num);
              }
            }}/>
            <Button id='inserir_1k' text='1k' onClick={() => setMilhas(qtd_Milhas + 1000)} />
            <Button id='inserir_10k' text='10k' onClick={() => setMilhas(qtd_Milhas + 10000)} />
            <Button id='remover_1k' text='1k' onClick={() => setMilhas(qtd_Milhas - 1000 > 0 ? qtd_Milhas - 1000 : 0)} />
            <Button id='remover_1k' text='10k' onClick={() => setMilhas(qtd_Milhas - 10000 > 0 ? qtd_Milhas - 10000 : 0)} />
          </div>

          <div className='Preco_milheiro'>
            <p>Preço Milheiro</p>
            <label htmlFor="preco_milheiro_input">R$ </label>
            <Input id='preco_milheiro_input' type='number' Initialvalue={preco_milheiro}/>
          </div>

          <div className='Desconto'>
            <p>Desconto</p>
            <Input id='desconto_input' type='number' Initialvalue={0} />
            <label htmlFor="desconto_input"> %</label>
          </div>
        </main>
    )
}