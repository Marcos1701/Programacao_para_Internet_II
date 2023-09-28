import { Usuario } from "../../../Acesso"

interface HeaderProps {
    setusuario: (usuario: Usuario | null) => void
}

export function Header({ setusuario }: HeaderProps) {
    return (
        <div>
            <h1>Aplicação de Like e Dislike</h1>
            <button onClick={() => setusuario(null)}>Sair</button>
        </div>
    )
}