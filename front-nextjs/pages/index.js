import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import fetch from 'node-fetch'
import Alert from 'react-popup-alert'
import 'react-popup-alert/dist/index.css'

// import { Wheel } from "react-custom-roulette"
// https://github.com/effectussoftware/react-custom-roulette/issues/4
import dynamic from "next/dynamic"
const Wheel = dynamic(
  () => {
    return import("react-custom-roulette").then((mod) => mod.Wheel);
  },
  { ssr: false }
);

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.API_SERVER_URL}/api/emojis`, {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`
    }
  })
  const data = await res.json()
  return {
    props: {
      emojis: data.data
    }
  }
}

export default function Home({ emojis }) {
  console.log(emojis)

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [alert, setAlert] = useState({
    type: '',
    text: '',
    show: false
  })
  const emojiOptions = emojis.map((emoji, idx) => ({ ...emoji, option: emoji.attributes.character }))

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * emojiOptions.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  const onCloseAlert = () => {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

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

        <span>
          <button className={styles.myButton}
            disabled={mustSpin}
            onClick={handleSpinClick}
          >
            {mustSpin ? 'Suerte!!!' : 'A picar!!! ⛏'}
          </button>
        </span>

        <div className={styles.grid}>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={emojiOptions}
            outerBorderColor={["#f2f2f2"]}
            outerBorderWidth={[25]}
            innerBorderColor={["#f2f2f2"]}
            radiusLineColor={["#dedede"]}
            radiusLineWidth={[10]}
            textColors={["#ffffff"]}
            fontSize={[50]}
            perpendicularText={[true]}
            backgroundColors={[
              "#ff492f",
              "#ff8a00",
              "#9e79e5",
              "#04cf35",
              "#00b8ff",
              "#e8d739",
              "#ff61ce",
              "#1f8d9c"
            ]}
            onStopSpinning={() => {
              setMustSpin(false);
              console.log(prizeNumber)
              const emojiResult = emojiOptions[prizeNumber]
              console.log(emojiResult)
              setAlert({
                type: emojiResult.attributes.name === 'crown' ? 'success' : 'error',
                header: emojiResult.attributes.character,
                text: emojiResult.attributes.description,
                show: true
              })
            }}
          />
        </div>
        <Alert
          header={alert.header}
          btnText={'Cerrar'}
          text={alert.text}
          type={alert.type}
          show={alert.show}
          onClosePress={onCloseAlert}
          pressCloseOnOutsideClick={true}
          showBorderBottom={true}
          alertStyles={{}}
          headerStyles={{ fontSize: '48px', margin: '0.4em' }}
          textStyles={{ padding: '10px' }}
          buttonStyles={{ margin: '0.3em' }}
        />
      </main>
    </div>
  )
}
