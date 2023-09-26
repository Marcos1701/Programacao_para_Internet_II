import { useRef } from 'react';
import { ulid } from 'ulidx';
import { ILivro } from '../..';
import './index.css'


interface FormLivrosProps {
    onSubmit: (livro: ILivro) => void
}


export const FormLivros = ({ onSubmit }: FormLivrosProps) => {
    const titulo = useRef<HTMLInputElement>(null)
    const link = useRef<HTMLInputElement>(null)
    const frase = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const livro: ILivro = {
            id: ulid(),
            titulo: titulo.current?.value ? titulo.current.value : 'Sem título',
            link: link.current?.value ? link.current.value : 'Sem link',
            frase: frase.current?.value ? frase.current.value : 'Sem frase'
        }
        onSubmit(livro)

        titulo.current!.value = ''
        link.current!.value = ''
        frase.current!.value = ''
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Adicionar livro</h2>
            <div>
                <label htmlFor="titulo">Título</label>
                <input type="text" name="titulo" id="titulo" ref={titulo} placeholder='Digite o Título do Livro' />
            </div>
            <div>
                <label htmlFor="link">Link</label>
                <input type="string" name="link" id="link" ref={link} placeholder='Digite o Link do livro' />
            </div>
            <div>
                <label htmlFor="frase">Frase</label>
                <input type="text" name="frase" id="frase" ref={frase} placeholder='Digite uma frase que resuma o livro' />
            </div>
            <button type="submit">Adicionar</button>
        </form>
    )
}