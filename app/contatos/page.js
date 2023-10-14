import styles from './contatos.module.css'
import Link from 'next/link'

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContatos() {
  try {
    const resposta = await fetch(`${baseUrl}/api/contatos`, { cache: 'no-store' });
    return await resposta.json();
  } catch (erro) {
    console.error(erro);
    return [];
  }
}

export default async function Page() {
  const contatos = await buscarContatos();
  return (
    <div className={styles.container}>
      <h1>Olá NextJS - Contatos Page</h1>
      <Link href="/contatos/criar">Criar</Link>
      <div className={styles.principal}>
        <table className={styles.contatos}>
          <thead>
            <tr>
              <th>nome</th>
              <th>logradouro</th>
              <th>bairro</th>
              <th>cidade</th>
              <th>uf</th>
              <th>latitude</th>
              <th>longitude</th>
              <th>tipo</th>

            </tr>
          </thead>
          <tbody>
            {
              contatos.map((contato) =>
                <tr key={contato.id}>
                  <td>{contato.Nome}</td>
                  <td>{contato.Logradouro}</td>
                  <td>{contato.Bairro}</td>
                  <td>{contato.Cidade}</td>
                  <td>{contato.UF}</td>
                  <td>{contato.Latitude}</td>
                  <td>{contato.Longitude}</td>
                  <td>{contato.Tipo}</td>
                </tr>
              )
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="8">Total contatos: {contatos.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}