"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../contatos.module.css"
import { useRouter } from "next/navigation";
import Authenticator from '@/src/components/authenticator';

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
    const [contato, setContato] = useState({ nome: '', logradouro: '', bairro: '', cidade: '', uf: '', latitude: '', longitude: '', tipo: '' })
    useEffect(() => {
        async function fetchData() {
            const data = await buscarContato(id)
            setContato(data)
        }
        fetchData()
    }, [id])

    const handleDelete = async () => {
        const confirmation = window.confirm("Tem certeza de que deseja excluir este hidrante?")
        if (confirmation) {

            const resposta = await fetch(`${baseUrl}/api/contatos/${contato.id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (resposta.ok) {
                router.push("/contatos")
            }
            else {
                alert("Erro ao excluir hidrante")
            }
        }
    }

    return (
        <Authenticator>
        <div className={styles.container}>
            <h1>Excluir hidrante</h1>
            <div className={styles.principal}>
                <div>
                    <p><strong>Nome: </strong>{contato.nome}</p>
                    <p><strong>Logradouro: </strong>{contato.logradouro}</p>
                    <p><strong>Bairro: </strong>{contato.bairro}</p>
                    <p><strong>Cidade: </strong>{contato.cidade}</p>
                    <p><strong>UF: </strong>{contato.uf}</p>
                    <p><strong>Latitude: </strong>{contato.latitude}</p>
                    <p><strong>Longitude: </strong>{contato.longitude}</p>
                    <p><strong>Tipo: </strong>{contato.tipo}</p>
                </div>
                <div style={{ display: "block" }}>
                    <button onClick={handleDelete}>Excluir</button>
                    <Link href="/contatos" className={styles.espacamento}>Voltar</Link>
                </div>
            </div>
        </div>
        </Authenticator>
    );
}