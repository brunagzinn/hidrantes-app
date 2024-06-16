"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import styles from './contatos.module.css'
import Link from 'next/link'
import Authenticator from '@/src/components/authenticator';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';


const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContatos(bairro, logradouro, nome, tipo) {
  try {
    const token = localStorage.getItem("token");
    const resposta = await fetch(`${baseUrl}/api/contatos?bairro=${bairro}&logradouro=${logradouro}&nome=${nome}&tipo=${tipo}`, {
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [contatoDetalhe, setContatoDetalhe] = useState(null);

  const searchParams = useSearchParams();
  const searchBairro = searchParams.get('bairro');
  const searchLogradouro = searchParams.get('logradouro');
  const searchNome = searchParams.get('nome');
  const searchTipo = searchParams.get('tipo');
  const [bairro, setBairro] = useState(searchBairro ?? '');
  const [logradouro, setLogradouro] = useState(searchLogradouro ?? '');
  const [nome, setNome] = useState(searchNome ?? '');
  const [tipo, setTipo] = useState(searchTipo ?? '');
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    buscarContatos(bairro, logradouro, nome, tipo).then(results => {
      setContatos(results);
    })
  }, [bairro, logradouro, nome, tipo])
  return (
    <div className={styles.container}>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{contatoDetalhe.nome}</ModalHeader>
              <ModalBody>
                <div>
                  <p><strong>Nome: </strong>{contatoDetalhe.nome}</p>
                  <p><strong>Logradouro: </strong>{contatoDetalhe.endereco}</p>
                  <p><strong>Bairro: </strong>{contatoDetalhe.bairro}</p>
                  <p><strong>Cidade: </strong>{contatoDetalhe.cidade}</p>
                  <p><strong>Estado: </strong>{contatoDetalhe.estado}</p>
                  <p><strong>Latitude: </strong>{contatoDetalhe.tipo}</p>
                  <p><strong>Longitude: </strong>{contatoDetalhe.tipo}</p>
                  <p><strong>Vazão: </strong>{contatoDetalhe.idade}</p>
                  <p><strong>Pressão: </strong>{contatoDetalhe.idade}</p>
                  <p><strong>Data da última vistoria: </strong>{contatoDetalhe.idade}</p>
                  <p><strong>Tipo: </strong>{contatoDetalhe.idade}</p>
                  <p><strong>Observação: </strong>{contatoDetalhe.idade}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} color="danger" variant='light'>Fechar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


      <h1>Cadastro de Hidrantes</h1>
      <Link href="/contatos/criar" className={styles.botaoAdd}>Adicionar</Link>
      <div className={styles.principal}>
        <div id='search' className={styles.filtros}>
          <tr>
            <th>Bairro: 
              <input
                value={bairro}
                onChange={event => setBairro(event.target.value)}
                placeholder='Pesquisa por bairro...'
              />
            </th>
            <th>Logradouro: 
              <input
                value={logradouro}
                onChange={event => setLogradouro(event.target.value)}
                placeholder='Pesquisa por Logradouro...'
              />
            </th>
            <th>Nome: 
              <input
                value={nome}
                onChange={event => setNome(event.target.value)}
                placeholder='Pesquisa por Nome...'
              />
            </th>
            <th>Tipo: 
              <input
                value={tipo}
                onChange={event => setTipo(event.target.value)}
                placeholder='Pesquisa por Tipo...'
              />
            </th>
          </tr>
        </div>
        <table className={styles.contatos}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Nome</th>
              <th>Logradouro</th>
              <th>Bairro</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {
              contatos.map((contato) =>
                <tr key={contato.id}>
                  <td>
                    <Link href={`/contatos/${contato.id}/editar`}>Editar </Link>|
                    <Link href={`/contatos/${contato.id}/excluir`}> Excluir</Link>
                    <Button onClick={() => {
                      setContatoDetalhe(contato);
                      onOpen()
                    }}>Detalhes</Button>
                  </td>
                  <td>
                    <Link target='blank' href={`https://www.google.com/maps?q=${contato.latitude},${contato.longitude}`}>Localizar</Link>
                  </td>
                  <td>{contato.nome}</td>
                  <td>{contato.logradouro}</td>
                  <td>{contato.bairro}</td> 
                  <td>{contato.tipo}</td>                  
                </tr>
              )
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6">Total de hidrantes: {contatos.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}