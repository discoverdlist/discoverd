import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Discoverd",
  description: "Explore os melhores bots brasileiros para seu servidor!",
  image: "/assets/logo.png",
  url: "https://list.andrepaiva.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
