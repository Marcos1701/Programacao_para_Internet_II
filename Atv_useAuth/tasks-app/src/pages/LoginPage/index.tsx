import React, { useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import './index.css'

interface LoginPagePros {
  next?: string
}

export function LoginPage({ next = '/' }: LoginPagePros) {

  const { signin, isAuthenticated } = useAuth();
  const [error, setError] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [redirection, setRedirection] = useState<boolean>(false);

  useEffect(() => {
    setIsAuth(isAuthenticated)
  }, [isAuthenticated])

  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = usernameInputRef.current!.value
    const password = passwordInputRef.current!.value

    if (username != 'Marcos' && password != '1234') {
      setError(true);
      return;
    }
    setError(false);
    signin({ username, password })
    usernameInputRef.current!.value = ''
    passwordInputRef.current!.value = ''
  }

  if (isAuth) {
    // return <Navigate to={next} />

    // para esperar 1 segundo e meio, antes de redirecionar
    setTimeout(() => {
      setRedirection(true);
    }, 1500)
  }

  return (
    <>
      <Header />
      <main>
        <h1>Login Page</h1>
        {error && <p className="msgError">Usuário ou senha inválidos!</p>}
        {isAuth && <div id="sucess">
          <p className="msgSuccess">Login realizado com sucesso!</p>
          <div className="animatedBorder"></div>
        </div>}

        <form onSubmit={handleLoginSubmit}>
          <input className={error ? 'invalidInput' : ''} type="text" placeholder="username" ref={usernameInputRef} />
          <input className={error ? 'invalidInput' : ''} type="password" placeholder="senha" ref={passwordInputRef} />
          <input type="submit" value="Realizar Login" />
        </form>
        {redirection && <Navigate to={next} />}
      </main>
      <Footer />
    </>
  )
}