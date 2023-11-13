"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../contatos.module.css"
import { useRouter } from "next/navigation";

const baseUrl =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContato(id) {
    try {
        const resposta = await fetch(`${baseUrl}/api/contatos/${id}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        return await resposta.json();
    } catch (erro) {
        console.error(erro);
        return [];
    }
}

export default function Page({ params: { id } }) {
    const router = useRouter();
    const [contato, setContato] = useState({
        nome: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
        latitude: '',
        longitude: '',
        tipo: ''
    })
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(contato)
        })
        if (resposta.ok) {
            router.push("/contatos")
        }
        else {
            alert("Erro ao atualizar hidrante")
        }
    }

    return (
        <div className={styles.container}>
            <h1>Atualizar hidrante</h1>
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
                            name="logradouro"
                            onChange={handleChange}
                            type="text" />
                    </div>
                    <div>
                        <label>Bairro: </label>
                        <select
                            value={contato.bairro}
                            name="bairro"
                            onChange={handleChange}
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
                        <label>Cidade: </label>
                        <input
                            value={contato.cidade}
                            name="cidade"
                            onChange={handleChange}
                            type="text" />
                    </div>
                    <div>
                        <label>UF: </label>
                        <input
                            value={contato.uf}
                            name="uf"
                            onChange={handleChange}
                            type="text" />
                    </div>
                    <div>
                        <label>Latitude (S): </label>
                        <input
                            value={contato.latitude}
                            name="latitude"
                            onChange={handleChange}
                            type="number" />
                    </div>
                    <div>
                        <label>Longitude (W): </label>
                        <input
                            value={contato.longitude}
                            name="longitude"
                            onChange={handleChange}
                            type="number" />
                    </div>
                    <div>
                        <label>Tipo: </label>
                        <select
                            value={contato.tipo}
                            name="tipo"
                            onChange={handleChange}
                        >
                            <option value="">Não informado</option>
                            <option value="Hid Coluna Rosca">Hid Coluna Rosca</option>
                            <option value="Hid Coluna Storze ">Hid Coluna Storze</option>
                            <option value="Hid Caixa Rosca ">Hid Caixa Rosca</option>
                            <option value="Hid Caixa Garra ">Hid Caixa Garra</option>
                        </select>
                    </div>

                    <button type="submit">Atualizar</button>
                    <Link href="/contatos" className={styles.espacamento}>Voltar</Link>
                </form>
            </div>
        </div>
    );
}