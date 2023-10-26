import image from 'next/image'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="mapaCanoas">
        <p>SELECIONE O BAIRRO DA OCORRÊNCIA NO MAPA</p>
        <Image
          src="/mapa-canoas.png"
          alt="Divisão da cidade de Canoas"
          width={700}
          height={500}
        />
      </div>
    </main>
  )
}

