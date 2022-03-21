import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido 🤠 a la búsqueda del 👑!!!
        </h1>

        <p className={styles.description}>
          Prueba suerte, pica un poco y a ver que encuentras...
        </p>

        <div className={styles.grid}>

        </div>
      </main>
    </div>
  )
}
