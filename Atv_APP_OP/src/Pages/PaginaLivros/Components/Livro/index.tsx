import { ILivro } from "../..";


interface LivroProps {
    livro: ILivro
    onRemove: (id: string) => void
}

export const Livro = ({ livro, onRemove }: LivroProps) => {
    return (
        <li>
            <h3>{livro.titulo}</h3>
            <a href={livro.link}>{livro.link}</a>
            <p>{livro.frase}</p>

            <button onClick={() => {
                if (confirm('Tem certeza que deseja remover?')) {
                    onRemove(livro.id)
                }
            }
            }>Remover</button>
        </li>
    )
}