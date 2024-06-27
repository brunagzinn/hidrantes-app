"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Authenticator from '@/src/components/authenticator';
import styles from "../../usuarios.module.css"

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

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
    const [usuario, setUsuario] = useState({
        username: '',
        password: '',
        perfil: ''
    });

    useEffect(() => {
        async function fetchData() {
            const data = await buscarUsuario(id);
            setUsuario(data);
        }
        fetchData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsuario(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const resposta = await fetch(`${baseUrl}/api/usuarios/${usuario.id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (resposta.ok) {
            router.push("/usuarios");
        } else {
            alert("Erro ao atualizar usuário");
        }
    };

    return (
        <Authenticator>
            <div className={styles.scrollContainer}>
                <h2 className="text-4xl text-center font-bold dark:text-white">Atualizar Usuário</h2>
                <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="username" id="username" value={usuario.username} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="password" id="password" value={usuario.password} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select id="perfil-select" name="perfil" value={usuario.perfil} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                            <option value="Administrador">Administrador</option>
                            <option value="Padrão">Padrão</option>
                        </select>
                        <label htmlFor="perfil-select" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Perfil</label>
                    </div>
                    <button type="submit" className="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Atualizar</button>
                    <Link href="/usuarios" className='text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-2'>Cancelar</Link>
                </form>
            </div>
        </Authenticator>
    );
}
