import { useMemo } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { NavLink } from "react-router-dom"

export function Header() {
    const { signout, isAuthenticated, user } = useAuth()

    const authBlock = useMemo(() => {
        return (
            isAuthenticated ?
                <p>{user!.username}
                    <button onClick={() => { signout() }}>Sair</button>
                </p>
                : <p>Olá Visitante!</p>)
    }, [isAuthenticated])
    return (

        <header>
            <h1>Tasks App</h1>
            <span>
                {authBlock}
            </span>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/tasks">Tasks</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/sobre">Sobre</NavLink></li>
                </ul>
            </nav>

        </header>
    )
}