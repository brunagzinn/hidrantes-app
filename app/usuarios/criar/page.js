"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../usuarios.module.css";
import Authenticator from '@/src/components/authenticator';

const baseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

export default function Criar() {
  const router = useRouter();

  const [newusername, setNewUsername] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [perfil, setPerfil] = useState("Padrão");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuario = { username: newusername, password: newpassword, perfil };

    const resposta = await fetch(`${baseUrl}/api/usuarios`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    });
    if (resposta.ok) {
      router.push("/usuarios");
    } else {
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <Authenticator>
      <div className={styles.scrollContainer}>
        <h2 className="text-4xl text-center font-bold dark:text-white">Cadastro de Usuário</h2>
        <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="newusername" id="newusername" value={newusername} onChange={(event) => setNewUsername(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="newusername" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="newpassword" name="newpassword" id="newpassword" value={newpassword} onChange={(event) => setNewPassword(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="newpassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select id="perfil-select" name="perfil" value={perfil} onChange={(event) => setPerfil(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <option value="Administrador">Administrador</option>
              <option value="Padrão">Padrão</option>
            </select>
            <label htmlFor="perfil-select" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Perfil</label>
          </div>
          <button type="submit" className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cadastrar</button>
          <Link href="/usuarios" className='text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Cancelar</Link>
        </form>
      </div>
    </Authenticator>
  );
}
