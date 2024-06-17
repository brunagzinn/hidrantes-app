import Link from 'next/link';
import Image from 'next/image';
import { inter } from './layout';
import { Providers } from './providers';
import { Foot } from './foot';


export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div id="container">
          <header>
            <div className="titulo">
              <Image
                src="/brasao-bombeiros.png"
                alt="Brasão Corpo de Bombeiros"
                width={165}
                height={160} />
              <div className="escrita">
                <h1>HIDRANTE PÚBLICO CANOAS - LOCALIZAÇÃO FÁCIL</h1>
                <h2>CORPO DE BOMBEIROS MILITAR DE CANOAS/RS</h2>
              </div>
            </div>
            <ul className="topnav">
              <li className="left">
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/contatos">Hidrantes</Link>
              </li>
              <li className='right'>
                <Link href="/sobre">?</Link>
              </li>
            </ul>
          </header>
          <main>
            <section>
              <Providers>
                {children}
              </Providers>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
