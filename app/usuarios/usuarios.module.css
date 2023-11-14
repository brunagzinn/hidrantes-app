"use client"
import { useState, useEffect } from 'react';
import styles from './usuarios.module.css'
import Link from 'next/link'
import Authenticator from '@/src/components/authenticator';

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarUsuarios() {
  try {
    const token = localStorage.getItem('token');
    const resposta = await fetch(`${baseUrl}/api/usuarios`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await resposta.json();
  } catch (erro) {
    console.error(erro);
    return [];
  }
}

export default function Page() {

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    buscarUsuarios().then(results => {
      setUsuarios(results);
    })
  }, [])
  return (
    <Authenticator>
      <div className={styles.container}>
        <h1>Olá NextJS - Usuarios Page</h1>
        <Link href="/usuarios/criar">Criar</Link>
        <div className={styles.principal}>
          
          <table className={styles.usuarios}>
            <thead>
              <tr>
                <th></th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {
                usuarios.map((usuario) =>
                  <tr key={usuario.id}>
                    <td>
                      <Link href={`/usuarios/${usuario.id}/editar`}>Editar</Link> | <Link href={`/usuarios/${usuario.id}/excluir`}>Excluir</Link>
                    </td>
                    <td>{usuario.username}</td>
                  </tr>
                )
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total usuarios: {usuarios.length}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Authenticator>
  )
}