import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Discord List",
  description: "Discord List is a website to list and explore Discord bots.",
  url: "https://list.andrepaiva.dev",
  keywords: "discord, discord bots, discord bot list, discord list, discord bot, discord botlist, discordlist, discord bot list website, discord botlist website, discordlist website, discord bot list site, discord botlist site, discordlist site, discord bot list web, discord botlist web, discordlist web",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
