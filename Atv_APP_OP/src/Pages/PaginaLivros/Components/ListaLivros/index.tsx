import { ILivro } from "../.."
import { Livro } from "../Livro"
import './index.css'

interface ListaLivrosProps {
    livros: ILivro[]
    onRemove: (id: string) => void
}

export const ListaLivros: React.FC<ListaLivrosProps> = ({ livros, onRemove }: ListaLivrosProps) => {
    return (
        <>
            <h2>Livros</h2>
            <ul>
                {livros.map((livro) => (
                    <Livro key={livro.id} livro={livro} onRemove={onRemove} />
                ))}
            </ul>
        </>
    )
}