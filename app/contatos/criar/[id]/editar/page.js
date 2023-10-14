"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../contatos.module.css"
import { useRouter } from "next/navigation";

const baseUrl =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContato(id) {
    try {
        const resposta = await fetch(`${baseUrl}/api/contatos/${id}`, { cache: 'no-store' });
        return await resposta.json();
    } catch (erro) {
        console.error(erro);
        return [];
    }
}

export default function Page({ params: { id } }) {
    const router = useRouter();
    const [contato, setContato] = useState({ nome: '', logradouro: '', bairro: '', cidade: '', uf: '', latitude: '', longitude: '', tipo: '' })
    useEffect(() => {
        async function fetchData() {
            const data = await buscarContato(id)
            setContato(data)
        }
        fetchData()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target
        setContato(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const resposta = await fetch(`${baseUrl}/api/contatos/${contato.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contato)
        })
        if (resposta.ok) {
            router.push("/contatos")
        }
        else {
            alert("Erro ao atualizar contato")
        }
    }

    return (
        <div className={styles.container}>
            <h1>Atualizar contato</h1>
            <div className={styles.principal}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome: </label>
                        <input
                            value={contato.nome}
                            name="nome"
                            onChange={handleChange}
                            type="text" />
                    </div>
                    <div>
                        <label>Logradouro: </label>
                        <input
                            value={contato.logradouro}
                            name="Logradouro"
                            onChange={handleChange}
                            type="text" />
                    </div>
                    <div>
                        <label>Bairro: </label>
                        <input
                            value={contato.bairro}
                            name="Bairro"
                            onChange={handleChange}
                            type="text" />
                    </div>

                    <div>
                        <label>Cidade: </label>
                        <input
                            value={contato.cidade}
                            name="Cidade"
                            onChange={handleChange}
                            type="text" />
                    </div>
                    <div>
                        <label>UF: </label>
                        <input
                            value={contato.uf}
                            name="UF"
                            onChange={handleChange}
                            type="text" />
                    </div>
                    <div>
                        <label>Latitude: </label>
                        <input
                            value={contato.latitude}
                            name="Latitude"
                            onChange={handleChange}
                            type="number" />
                    </div>
                    <div>
                        <label>Longitude: </label>
                        <input
                            value={contato.longitude}
                            name="Longitude"
                            onChange={handleChange}
                            type="number" />
                    </div>
                    <div>
                        <label>Tipo: </label>
                        <input
                            value={contato.telefone}
                            name="telefone"
                            onChange={handleChange}
                            type="number" />
                    </div>
                    <div>
                        <label>Tipo: </label>
                        <select
                            value={contato.tipo}
                            name="Tipo"
                            onChange={handleChange}
                        >
                            <option value="Hid Coluna Rosca">Hid Coluna Rosca</option>
                            <option value="Hid Coluna Storze ">Hid Coluna Storze</option>
                            <option value="Hid Caixa Rosca ">Hid Caixa Rosca</option>
                            <option value="Hid Caixa Garra ">Hid Caixa Garra</option>
                            <option value="Não informado ">Nao informado </option>
                        </select>
                    </div>

                    <button type="submit">Atualizar</button>
                    <Link href="/contatos" className={styles.espacamento}>Voltar</Link>
                </form>
            </div>
        </div>
    );
}