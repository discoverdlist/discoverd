"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";
import "./styles/globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import ThemeProvider from "@/components/ThemeProvider";

config.autoAddCss = false;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const [translations, setTranslations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract language from path
  const pathSegments = router.asPath.split("/");
  const lang =
    pathSegments.length > 1 && ["en", "pt"].includes(pathSegments[1])
      ? pathSegments[1]
      : "pt";

  // Load translations
  useEffect(() => {
    async function loadTranslations() {
      const dict = await getDictionary(lang);
      setTranslations(dict);
    }

    loadTranslations();
  }, [lang]);

  useEffect(() => {
    // Simula um pequeno atraso para garantir que o cliente esteja pronto
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Title and description based on language
  const title =
    lang === "en"
      ? "Discoverd - Find the best Discord bots"
      : "Discoverd - Encontre os melhores bots para Discord";
  const description =
    lang === "en"
      ? "Find the best Brazilian bots for your Discord server! All in an easy, fast way and in one place, come to Discoverd!"
      : "Encontre os melhores bots brasileiros para seu servidor no Discord! Tudo isso de maneira fácil e rápida e em um só lugar, venha para a Discoverd!";

  return (
    <SessionProvider session={session}>
      <ThemeProvider defaultTheme="system" storageKey="discoverd-theme">
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="keywords"
            content="discord, discord bots, discord bot list, discord list, discord bot, discord botlist, discordlist, discord bot list website, discord botlist website, discordlist website, discord bot list site, discord botlist site, discordlist site, discord bot list web, discord botlist web, discordlist web, brasil, brazil, brasileiro, br"
          />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta
            property="og:locale"
            content={lang === "en" ? "en_US" : "pt_BR"}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
        </Head>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <Navbar />
            <Component {...pageProps} translations={translations} lang={lang} />
            <Footer />
          </>
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}
