import image from 'next/image'
import styles from './page.module.css'
import Image from 'next/image'
import mapaCidade from './mapa-canoas.png'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="mapaCanoas">
        <p>SELECIONE O BAIRRO DA OCORRÊNCIA NO MAPA</p>
        <Image
          src={mapaCidade}
          alt="Divisão da cidade de Canoas"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
    </main>
  )
}

