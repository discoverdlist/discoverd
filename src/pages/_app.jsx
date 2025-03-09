import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SessionProvider } from "next-auth/react"
import './styles/globals.css';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
config.autoAddCss = false

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Discoverd</title>
        <meta name="description" content="Encontre os melhores bots brasileiros para seu servidor no Discord! Tudo isso de maneira fácil e rápida e em um só lugar, venha para a Discoverd!" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="discord, discord bots, discord bot list, discord list, discord bot, discord botlist, discordlist, discord bot list website, discord botlist website, discordlist website, discord bot list site, discord botlist site, discordlist site, discord bot list web, discord botlist web, discordlist web, brasil, brazil, brasileiro, br" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  )
}
