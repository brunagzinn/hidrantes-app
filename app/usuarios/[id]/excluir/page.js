"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../usuarios.module.css"
import { useRouter } from "next/navigation";

const baseUrl =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

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
        return [];
    }
}

export default function Page({ params: { id } }) {
    const router = useRouter();
    const [usuario, setUsuario] = useState({
        username: '',
        password: ''
    })
    useEffect(() => {
        async function fetchData() {
            const data = await buscarUsuario(id)
            setUsuario(data)
        }
        fetchData()
    }, [id])

    const handleDelete = async () => {
        const confirmation = window.confirm("Tem certeza de que deseja excluir este usuário?")
        if (confirmation) {

            const resposta = await fetch(`${baseUrl}/api/usuarios/${usuario.id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (resposta.ok) {
                router.push("/usuarios")
            }
            else {
                alert("Erro ao excluir usuário")
            }
        }
    }

    return (
        <Authenticator>
            <div className={styles.container}>
                <h1>Excluir usuário</h1>
                <div className={styles.principal}>
                    <div>
                        <p><strong>Username: </strong>{usuario.username}</p>
                    </div>
                    <div style={{ display: "block" }}>
                        <button onClick={handleDelete}>Excluir</button>
                        <Link href="/usuarios" className={styles.espacamento}>Voltar</Link>
                    </div>
                </div>
            </div>
        </Authenticator>
    );
}