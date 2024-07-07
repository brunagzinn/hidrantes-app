"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './usuarios.module.css';
import Link from 'next/link';
import Authenticator from '@/src/components/authenticator';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import useAuthenticatedFetch from '@/src/hooks/useAuthenticatedFetch';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [usuarioDetalhe, setUsuarioDetalhe] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const authenticatedFetch = useAuthenticatedFetch();

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await authenticatedFetch(`${baseUrl}/api/usuarios`);
      if (response) {
        const results = await response.json();
        setUsuarios(results);
      }
    };
    fetchUsuarios();
  }, [authenticatedFetch]);

  return (
    <div className={styles.container}>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{usuarioDetalhe?.username}</ModalHeader>
              <ModalBody>
                <div>
                  <p><strong>Username: </strong>{usuarioDetalhe?.username}</p>
                  <p><strong>Perfil: </strong>{usuarioDetalhe?.perfil}</p>
                </div>
                <div className='mt-5'>
                  <p className='text-center'>Opções de Usuário:</p>
                </div>
                <div className='flex justify-center'>
                  <Link href={`/usuarios/${usuarioDetalhe?.id}/editar`} className='text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Editar</Link>
                  <Link href={`/usuarios/${usuarioDetalhe?.id}/excluir`} className='text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Excluir</Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} color="danger" variant='light'>Fechar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <h2 className="text-4xl text-center font-bold dark:text-white">Usuários</h2>
      <p className="text-center my-4 text-lg text-gray-500">Clique no botão <strong>detalhes</strong> para obter mais opções</p>
      <Link href="/usuarios/criar" className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Adicionar Usuário</Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">Mais Opções</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3 text-center">Perfil</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarios.map((usuario) =>
                <tr key={usuario.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4 flex flex-col sm:flex-row justify-center">
                    <Button className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => { setUsuarioDetalhe(usuario); onOpen(); }}>Detalhes</Button>
                  </td>
                  <td className="px-6 py-4">{usuario.username}</td>
                  <td className="px-6 py-4">{usuario.perfil}</td>
                </tr>
              )}
          </tbody>
          <tfoot>
            <tr>
              <td className='px-6 py-2' colSpan="3">Total de usuários: {usuarios.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
