import { useState } from 'react';
import { FormLivros } from './Components/FormLivros';
import { ListaLivros } from './Components/ListaLivros';


export interface ILivro {
    id: string
    titulo: string
    link: string
    frase: string
}

export const PaginaLivros: React.FC = () => {
    const [livros, setLivros] = useState<ILivro[]>([])

    const AddLivro = (livro: ILivro) => {
        setLivros([...livros, livro])
        alert('Livro adicionado com sucesso!')
    }

    const RemoveLivro = (id: string) => {
        setLivros(livros.filter(livro => livro.id !== id))
        alert('Livro removido com sucesso!')
    }

    return (
        <>
            <h1>Pagina de Livros</h1>

            <FormLivros onSubmit={AddLivro} />

            <ListaLivros livros={livros} onRemove={RemoveLivro} />
        </>
    )
}