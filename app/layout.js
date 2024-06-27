import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from './navbar'
import { Foot } from './foot'
import { AuthProvider } from '@/src/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hidrante Fácil Canoas',
  description: 'Encontre os hidrantes de Canoas de forma inteligente e eficiente!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar></Navbar>
          <section>
            <Providers>
              {children}
            </Providers>
          </section>
        </AuthProvider>
      </body>
    </html>
  )
}