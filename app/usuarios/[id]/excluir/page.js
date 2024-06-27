"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../usuarios.module.css";
import { useRouter } from "next/navigation";
import Authenticator from '@/src/components/authenticator';

const baseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarUsuario(id) {
    try {
        const resposta = await fetch(`${baseUrl}/api/usuarios/${id}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        return await resposta.json();
    } catch (erro) {
        console.error(erro);
        return null;
    }
}

export default function Page({ params: { id } }) {
    const router = useRouter();
    const [usuario, setUsuario] = useState({ username: '', perfil: '' });

    useEffect(() => {
        async function fetchData() {
            const data = await buscarUsuario(id);
            setUsuario(data);
        }
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        const confirmation = window.confirm("Tem certeza de que deseja excluir este usuário?");
        if (confirmation) {
            const resposta = await fetch(`${baseUrl}/api/usuarios/${usuario.id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (resposta.ok) {
                router.push("/usuarios");
            } else {
                alert("Erro ao excluir usuário");
            }
        }
    };

    return (
        <Authenticator>
            <div className={styles.scrollContainer}>
                <h2 className="text-4xl mt-10 text-center font-bold dark:text-white">Excluir Usuário?</h2>
                <div className='flex items-center justify-center mt-20'>
                    <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Username: {usuario.username}</h5>
                        <div>
                            <p><strong>Perfil: </strong>{usuario.perfil}</p>
                        </div>
                        <button onClick={handleDelete} className="text-white mb-4 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Excluir</button>
                        <Link href="/usuarios" className='text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-2'>Cancelar</Link>
                    </div>
                </div>
            </div>
        </Authenticator>
    );
}
