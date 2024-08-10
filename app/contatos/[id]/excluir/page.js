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
    const [contato, setContato] = useState({ nome: '', logradouro: '', bairro: '', cidade: '', uf: '', latitude: '', longitude: '', tipo: '', observacao: '', vazao: '', pressao: '', data: '' })
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
            <div className={styles.scrollContainer}>
                <h2 className="text-4xl mt-10 text-center font-bold dark:text-white">Excluir Hidrante?</h2>
                <div className='flex items-center justify-center mt-20'>
                    <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nome do Hidrante: {contato.nome} </h5>
                        <div>
                            <p><strong>Logradouro: </strong>{contato.logradouro}</p>
                            <p><strong>Bairro: </strong>{contato.bairro}</p>
                            <p><strong>Cidade: </strong>{contato.cidade}</p>
                            <p><strong>UF: </strong>{contato.uf}</p>
                            <p><strong>Latitude: </strong>{contato.latitude}</p>
                            <p><strong>Longitude: </strong>{contato.longitude}</p>
                            <p><strong>Vazão: </strong>{contato.vazao}</p>
                            <p><strong>Pressão: </strong>{contato.pressao}</p>
                            <p><strong>Data da última vistoria: </strong>{contato.datadaultimavistoria}</p>
                            <p><strong>Tipo: </strong>{contato.tipo}</p>
                            <br></br>
                            <p><strong>Observacao:</strong></p>
                            <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">{contato.observacao}</p>
                        </div>
                        <button onClick={handleDelete} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Excluir</button>
                        <Link href="/contatos" className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Cancelar</Link>
                    </div>

                </div>
            </div>
        </Authenticator>
    );
}