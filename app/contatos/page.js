import styles from './contatos.module.css'

async function buscarContatos() {
  try {
    const resposta = await fetch("http://localhost:3000/api/contatos");
    return await resposta.json();
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Page() {
  const contatos = await buscarContatos();
  return (
    <>
      <h1>Olá NextJS - Contatos Page</h1>
      <table className={styles.contatos}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {
            contatos.map((contato) =>
              <tr key={contato.id}>
                <td>{contato.nome}</td>
                <td>{contato.endereco}</td>
                <td>{contato.telefone}</td>
              </tr>
            )
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total contatos: {contatos.length}</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}