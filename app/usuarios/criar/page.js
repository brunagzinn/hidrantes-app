"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "../usuarios.module.css"

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

export default function Criar() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuario = {
      username, password
    }

    const resposta = await fetch(`${baseUrl}/api/usuarios`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(usuario)
    })
    if (resposta.ok) {
      router.push("/usuarios")
    }
    else {
      alert("Erro ao cadastrar usuário")
    }
  }

  return (
    <Authenticator>
    <div className={styles.container}>
      <h1>Cadastro de Usuário</h1>
      <div className={styles.principal}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input
              value={Username}
              onChange={(event) => setUsername(event.target.value)}
              type="text" />
          </div>
          <div>
            <label>Password: </label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password" />
          </div>
          <button type="submit">Cadastrar</button>
          <Link href="/usuarios" className={styles.espacamento}>Voltar</Link>
        </form>
      </div>
    </div>
   </Authenticator>
   );
 }