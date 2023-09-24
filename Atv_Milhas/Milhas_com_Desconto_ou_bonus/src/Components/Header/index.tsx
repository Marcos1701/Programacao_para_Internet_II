import Button from "../Button"


export function Header() {
  const onclick = () => {
    alert("Aqui voce pode calcular o valor das suas milhas com desconto e/ou bonus!")
  } // exibir mensagem e depois ocultar mensagem
  return (
    <header>
      <div className='exibir_calculo'>
        <Button id='Message_calculate_milhas' text='Calcular milhas com desconto!' onClick={onclick} />
      </div>
    </header>
  )
}