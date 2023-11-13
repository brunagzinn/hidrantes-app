"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "../contatos.module.css"

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

export default function Criar() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contato = {
      nome, logradouro, bairro, cidade, uf, latitude, longitude, tipo
    }

    const resposta = await fetch(`${baseUrl}/api/contatos`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(contato)
    })
    if (resposta.ok) {
      router.push("/contatos")
    }
    else {
      alert("Erro ao cadastrar hidrante")
    }
  }

  return (
    <div className={styles.container}>
      <h1>Cadastro de Hidrante</h1>
      <div className={styles.principal}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>nome: </label>
            <input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              type="text" />
          </div>
          <div>
            <label>logradouro: </label>
            <input
              value={logradouro}
              onChange={(event) => setLogradouro(event.target.value)}
              type="text" />
          </div>
          <div>
            <label>bairro: </label>
            <select
              value={bairro}
              onChange={(event) => setBairro(event.target.value)}
            >
              <option value="Brigadeira">Brigadeira</option>
              <option value="Centro">Centro</option>
              <option value="Estância Velha">Estância Velha</option>
              <option value="Fátima">Fátima</option>
              <option value="Guajuviras">Guajuviras</option>
              <option value="Harmonia">Harmonia</option>
              <option value="Igara">Igara</option>
              <option value="Ilha das Garças">Ilha das Garças</option>
              <option value="Industrial">Industrial</option>
              <option value="Marechal Rondon">Marechal Rondon</option>
              <option value="Mathias Velho">Mathias Velho</option>
              <option value="Mato Grande">Mato Grande</option>
              <option value="Niterói">Niterói</option>
              <option value="Nossa Senhora das Graças">Nossa Senhora das Graças</option>
              <option value="Olaria">Olaria</option>
              <option value="Rio Branco">Rio Branco</option>
              <option value="São José">São José</option>
              <option value="São Luiz">São Luiz</option>
            </select>
          </div>
          <div>
            <label>cidade: </label>
            <input
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
            />
          </div>
          <div>
            <label>uf: </label>
            <input
              value={uf}
              onChange={(event) => setUf(event.target.value)}
            />
          </div>
          <div>
            <label>latitude (S): </label>
            <input
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
              type="number" />
          </div>
          <div>
            <label>longitude (W): </label>
            <input
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
              type="number" />
          </div>
          <div>
            <label>tipo: </label>
            <select
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
            >
              <option value="Hid Coluna Rosca">Hid Coluna Rosca</option>
              <option value="Hid Coluna Storz ">Hid Coluna Storz</option>
              <option value="Hid Caixa Rosca ">Hid Caixa Rosca</option>
              <option value="Hid Caixa Garra ">Hid Caixa Garra</option>
              <option value="Não informado ">Não informado </option>
            </select>
          </div>
          <button type="submit">Cadastrar</button>
          <Link href="/contatos" className={styles.espacamento}>Voltar</Link>
        </form>
      </div>
    </div>
  );
}