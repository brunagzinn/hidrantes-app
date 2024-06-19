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
                <div className='mt-5'>
                  <p className='text-center'>Opções hidrantes:</p>
                </div>
                <div className='flex justify-center'>
                  <Link href='' className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'> Localizar</Link>
                  <Link href='' className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Editar</Link>
                  <Link href='' className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'> Excluir</Link>
                  <Link href="/contatos/criar" className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Adicionar</Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} color="danger" variant='light'>Fechar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


      <h2 class="text-4xl text-center font-bold dark:text-white">Hidrantes Disponíveis</h2>
      <p class="text-center	my-4 text-lg text-gray-500">Clique no botão <strong>detalhes</strong> para obter mais opções</p>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <input value={bairro} onChange={event => setBairro(event.target.value)} placeholder='Pesquisa por bairro...' />

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Mais opçoes:</th>
              <th scope="col" class="px-6 py-3">Logradouro</th>
              <th scope="col" class="px-6 py-3">Bairro</th>
              <th scope="col" class="px-6 py-3">Cidade</th>
              <th scope="col" class="px-6 py-3">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {
              contatos.map((contato) =>
                <tr key={contato.contatoId} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium">

                    <Button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => { setContatoDetalhe(contato); onOpen() }}>Detalhes</Button>
                  </th>
                  <td class="px-6 py-4">{contato.logradouro}</td>
                  <td class="px-6 py-4">{contato.bairro}</td>
                  <td class="px-6 py-4">{contato.cidade}</td>
                  <td class="px-6 py-4">{contato.tipo}</td>
                </tr>
              )}
          </tbody>
          <tfoot>
            <tr>
              <td className='px-6 py-2' colSpan="9">Total de hidrantes: {contatos.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
}