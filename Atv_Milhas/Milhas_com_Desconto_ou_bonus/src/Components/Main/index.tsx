import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";

export function Main() {

  const [qtd_Milhas, setMilhas] = useState<number>(0)
  const [preco_milheiro, setPreco_milheiro] = useState<number>(0)
  const [Desconto, setDesconto] = useState<number>(0)
  const [valor_cada_milheiro, setvalor_cada_milheiro] = useState<number>(0)

  useEffect(() => {
    const valor_cada_milheiro_com_desconto: number = preco_milheiro - (preco_milheiro * (1 - (Desconto / 100)))
    console.log(valor_cada_milheiro_com_desconto)
    setvalor_cada_milheiro(valor_cada_milheiro_com_desconto)
  }, [qtd_Milhas, preco_milheiro, Desconto]) // isso é um array de dependencias, ou seja, quando algum desses valores mudar, o useEffect será executado


  return (
    <main>
      <div className='Milhas'>
        <p>Milhas</p>
        <Input id='milhas_input' type='text' Initialvalue={qtd_Milhas} onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          const num: number = parseInt(target.value);
          if ((!isNaN(num) && num >= 0)) {
            setMilhas(num);
          }
        }} />
        <Button id='inserir_1k' text='1k' onClick={() => setMilhas(qtd_Milhas + 1000)} />
        <Button id='inserir_10k' text='10k' onClick={() => setMilhas(qtd_Milhas + 10000)} />
        <Button id='remover_1k' text='1k' onClick={() => setMilhas(qtd_Milhas - 1000 > 0 ? qtd_Milhas - 1000 : 0)} />
        <Button id='remover_1k' text='10k' onClick={() => setMilhas(qtd_Milhas - 10000 > 0 ? qtd_Milhas - 10000 : 0)} />
      </div>

      <section className='Preco_milheiro'>
        <p>Preço Milheiro</p>
        <label htmlFor="preco_milheiro_input">R$ </label>
        <Input id='preco_milheiro_input' type='text' Initialvalue={preco_milheiro} onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          const num: number = parseInt(target.value);
          if ((!isNaN(num) && num >= 0)) {
            setPreco_milheiro(num);
          }
        }} />
      </section>

      <section className='Desconto_content'>
        <p>Desconto</p>
        <div id="Desconto">
          <Input id='Desconto_input' type='number' Initialvalue={Desconto} onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
            const num: number = parseInt(target.value);
            if ((!isNaN(num) && num >= 0 && num <= 100)) {
              setDesconto(num);
            }
          }} />
          <label htmlFor="Desconto_input"> %</label>
        </div>
        {/* <div id="Buttons_Desconto">
          <Button id="Desconto_80" text="80%" onClick={() => {
            setDesconto(
              Desconto + 80 <= 100 &&
                Desconto + 80 >= 0 ? Desconto + 80 : 100)
          }} />
          <Button id="Desconto_100" text="100%" onClick={() => {
            setDesconto(100)
          }} />
        </div> */}
      </section>

      {
        valor_cada_milheiro > 0 && qtd_Milhas > 0 ?
          <section className='Resultado'>
            {valor_cada_milheiro >= 70 ?
              <div className='retorno_visual'>
                <div className="grafico_red"></div>
                <p>Péssimo negócio</p>
              </div>
              : valor_cada_milheiro >= 50 ?
                <div className='retorno_visual'>
                  <div className="grafico_orange"></div>
                  <p>Deve-se pensar bem</p>
                </div>
                : valor_cada_milheiro >= 30 ?
                  <div className='retorno_visual'>
                    <div className="grafico_yellow"></div>
                    <p>Regular</p>
                  </div>
                  :
                  <div className='retorno_visual'>
                    <div className="grafico_green"></div>
                    <p>Ótimo negócio</p>
                  </div>
            }

            <div className="retorno_preco_milheiro">
              <p>Cada milheiro sairá por <strong>R$ {valor_cada_milheiro.toPrecision(2)}</strong></p>
            </div>

            <div className="explicacao_final">
              <p>
                *Sua compra de {qtd_Milhas} milhas custaria R$ {
                  (qtd_Milhas / 1000) * preco_milheiro
                } porém com seu desconto de {Desconto} % pagará apenas R$ {
                  (qtd_Milhas / 1000) * preco_milheiro * (1 - (Desconto / 100)) < 0 ?
                    0 :
                    (qtd_Milhas / 1000) * preco_milheiro * (1 - (Desconto / 100))
                }.<br />
                <strong>
                  Economizou R$ {
                    (qtd_Milhas / 1000) * preco_milheiro - (qtd_Milhas / 1000) * (preco_milheiro * (1 - (Desconto / 100))) < 0 ?
                      0 :
                      (qtd_Milhas / 1000) * preco_milheiro - (qtd_Milhas / 1000) * (preco_milheiro * (1 - (Desconto / 100)))
                  }, {
                    Desconto === 0 ? "0" : Desconto === 100 ? "100" : Desconto
                  } % a menos com seu desconto.
                </strong>*
              </p>
            </div>
          </section>
          : null
      }
    </main>
  )
}