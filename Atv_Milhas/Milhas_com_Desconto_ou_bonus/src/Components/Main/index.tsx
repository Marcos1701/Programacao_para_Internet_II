import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";

export function Main() {

  const [qtd_Milhas, setMilhas] = useState<number>(0)
  const [preco_milheiro, setPreco_milheiro] = useState<number>(0)
  const [Desconto, setDesconto] = useState<number>(0)
  const [Bonus, setBonus] = useState<number>(0)
  const [qtd_milhas_com_bonus, setQtd_milhas_com_bonus] = useState<number>(0)
  const [valor_cada_milheiro, setvalor_cada_milheiro] = useState<number>(0)
  const [valor_economia, setValor_economia] = useState<number>(0)

  const atualizaValores = () => {
    if (Desconto === 0 && Bonus === 0) {
      return;
    }

    if (Desconto >= 0 && Bonus === 0) {
      setvalor_cada_milheiro(preco_milheiro * (1 - (Desconto / 100)));
      setValor_economia(((qtd_Milhas / 1000) * preco_milheiro) - ((qtd_Milhas / 1000) * valor_cada_milheiro));
      return;
    }

    setvalor_cada_milheiro(preco_milheiro * (1 - (Desconto / 100)));
    setQtd_milhas_com_bonus(qtd_Milhas * (1 + (Bonus / 100)));
    setValor_economia(((qtd_Milhas / 1000) * preco_milheiro) - ((qtd_Milhas / 1000) * valor_cada_milheiro)); // o valor fica em ponto flutuante, mas ao atualizar a pagina ele normaliza (não sei porque..)
  }

  useEffect(atualizaValores, [valor_economia, qtd_Milhas, preco_milheiro, Desconto, Bonus]);


  return (
    <main>
      <div className='Milhas_content'>
        <p>Milhas</p>

        <div className="milhas_inputs">
          <Button id='inserir_1k' className="mil_milhas" text='+ 1k' onClick={() => setMilhas(qtd_Milhas + 1000)} />
          <Button id='inserir_10k' className="dez_mil_milhas" text='+ 10k' onClick={() => setMilhas(qtd_Milhas + 10000)} />
          <Input id='milhas_input' type='text' Initialvalue={qtd_Milhas} onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
            if (target.value === '') {
              setMilhas(0);
              return;
            }
            const num: number = parseInt(target.value);
            if ((!isNaN(num) && num >= 0)) {
              setMilhas(num);
            }
          }} />
          <Button id='remover_10k' className="dez_mil_milhas" text='- 10k' onClick={() => setMilhas(qtd_Milhas - 10000 > 0 ? qtd_Milhas - 10000 : 0)} />
          <Button id='remover_1k' className="mil_milhas" text='- 1k' onClick={() => setMilhas(qtd_Milhas - 1000 > 0 ? qtd_Milhas - 1000 : 0)} />
        </div>
      </div>

      <section className='Preco_milheiro'>
        <p>Preço Milheiro</p>
        <label htmlFor="preco_milheiro_input">R$ </label>
        <Input id='preco_milheiro_input' type='text' Initialvalue={preco_milheiro} onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          if (target.value === '') {
            setPreco_milheiro(0);
            return;
          }
          const num: number = parseInt(target.value);
          if ((!isNaN(num) && num >= 0)) {
            setPreco_milheiro(num)
          }
        }} />
      </section>

      <section className='Desconto_content'>
        <p>Desconto</p>
        <div id="Desconto">
          <Input id='Desconto_input' type='number' Initialvalue={Desconto} onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
            if (target.value === '') {
              setDesconto(0);
              return;
            }
            const num: number = parseInt(target.value);
            if ((!isNaN(num) && num >= 0 && num <= 100)) {
              setDesconto(num);
            }
          }} />
          <label htmlFor="Desconto_input"> %</label>
        </div>
      </section>

      <section className="Bonus_content">
        <p>Bônus</p>
        <div id="Bonus">
          <Input id='Bonus_input' type='number' Initialvalue={Bonus} onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
            if (target.value === '') {
              setBonus(0);
              return;
            }
            const num: number = parseInt(target.value);
            if ((!isNaN(num) && num >= 0)) {
              setBonus(num);
            }
          }} />
          <label htmlFor="Bonus_input"> %</label>
        </div>
      </section>

      {
        valor_cada_milheiro > 0 && qtd_Milhas > 0 ?
          <section className='Resultado'>
            {valor_cada_milheiro >= 70 ?
              <div className='retorno_visual'>
                <div className="grafico_red"></div>
                <p className="pessimo">Péssimo negócio</p>
              </div>
              : valor_cada_milheiro >= 50 ?
                <div className='retorno_visual'>
                  <div className="grafico_orange"></div>
                  <p className="mediano">Deve-se pensar bem</p>
                </div>
                : valor_cada_milheiro >= 30 ?
                  <div className='retorno_visual'>
                    <div className="grafico_yellow"></div>
                    <p className="regular">Regular</p>
                  </div>
                  :
                  <div className='retorno_visual'>
                    <div className="grafico_green"></div>
                    <p className="otimo">Ótimo negócio</p>
                  </div>
            }

            <div className="retorno_preco_milheiro">
              <p>Cada milheiro sairá por <strong>R$ {valor_cada_milheiro.toPrecision(2)}</strong></p>
            </div>

            <div className="explicacao_final">
              <p>
                *Sua compra de {qtd_Milhas} milhas custaria R$ {
                  (qtd_Milhas / 1000) * preco_milheiro
                } porém com seu Desconto de {Desconto}% pagará apenas R$ {
                  ((qtd_Milhas / 1000) * valor_cada_milheiro).toPrecision(2)
                } {Bonus > 0 ? <span> e ainda ganhará {qtd_milhas_com_bonus - qtd_Milhas} milhas de bônus</span> : <span>.</span>} <br />
                <strong>
                  Economizou R$ {
                    valor_economia.toPrecision(2)
                  }.
                </strong>*
              </p>
            </div>
          </section>
          : null
      }
    </main>
  )
}