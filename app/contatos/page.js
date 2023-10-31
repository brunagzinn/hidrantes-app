"use client"
import { useState, useEffect } from 'react';
import styles from './contatos.module.css'
import Link from 'next/link'

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContatos(bairro) {
  try {
    const resposta = await fetch(`${baseUrl}/api/contatos?bairro=${bairro}`, { cache: 'no-store' });
    return await resposta.json();
  } catch (erro) {
    console.error(erro);
    return [];
  }
}

export default function Page() {

  const [bairro, setBairro] = useState('');
  const [contatos, setContatos] = useState([])

  useEffect(() => {

    buscarContatos(bairro).then(results => {
      setContatos(results);
    })
  }, [bairro])
  return (
    <div className={styles.container}>
      <h1>Cadastro de Hidrantes</h1>
      <Link href="/contatos/criar" className={styles.botaoAdd}>Adicionar</Link>
      <div className={styles.principal}>
        <input
          value={bairro}
          onChange={event => setBairro(event.target.value)}
          placeholder='Pesquisa por bairro...'
        />
        <table className={styles.contatos}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Nome</th>
              <th>Logradouro</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {
              contatos.map((contato) =>
                <tr key={contato.id}>
                  <td>
                    <Link href={`/contatos/${contato.id}/editar`}>Editar</Link>
                    <Link href={`/contatos/${contato.id}/excluir`}>Excluir</Link>|

                  </td>
                  <td> 
                  <Link target='blank' href={`https://www.google.com/maps?q=${contato.latitude},${contato.longitude}`}>Localizar</Link>
                    
                  </td>

                  <td>{contato.nome}</td>
                  <td>{contato.logradouro}</td>
                  <td>{contato.bairro}</td>
                  <td>{contato.cidade}</td>
                  <td>{contato.uf}</td>
                  <td>{contato.latitude}</td>
                  <td>{contato.longitude}</td>
                  <td>{contato.tipo}</td>


                </tr>


              )
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="9">Total de hidrantes: {contatos.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}