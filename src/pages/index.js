import Link from "next/link"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faFire, faClock, faChartBar } from "@fortawesome/free-solid-svg-icons"
// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const mostVotedBots = [
    {
      name: 'Lyra',
      description: 'O seu bot multifuncional para Discord! O único bot que você vai precisar em seu Servidor!',
      status: {
        guilds: 1000,
        votes: 10000,
      },
      id: 'lyra',
      avatar: 'https://cdn.discordapp.com/avatars/1188935519028138087/11eb20329407081671cb9fd45a2d91ac.webp?size=2048'
    },
    {
      name: 'Loritta',
      description: 'Loritta é um bot brasileiro que está presente em mais de 200 mil servidores do Discord.',
      status: {
        guilds: 1000,
        votes: 10000,
      },
      avatar: 'https://cdn.discordapp.com/avatars/297153970613387264/922dcabe60f85c35e8482121c8361526.webp?size=2048',
      id: 'loritta'
    },
    {
      name: 'MEE6',
      description: 'MEE6 é um bot de moderação e entretenimento para o seu servidor do Discord.',
      status: {
        guilds: 1000,
        votes: 10000,
      },
      id: 'mee6',
      avatar: 'https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.webp?size=2048'
    },
    {
      name: 'Lyra',
      description: 'O seu bot multifuncional para Discord! O único bot que você vai precisar em seu Servidor!',
      status: {
        guilds: 1000,
        votes: 10000,
      },
      id: 'lyra',
      avatar: 'https://cdn.discordapp.com/avatars/1188935519028138087/11eb20329407081671cb9fd45a2d91ac.webp?size=2048'
    },
    {
      name: 'Loritta',
      description: 'Loritta é um bot brasileiro que está presente em mais de 200 mil servidores do Discord.',
      status: {
        guilds: 1000,
        votes: 10000,
      },
      id: 'loritta',
      avatar: 'https://cdn.discordapp.com/avatars/297153970613387264/922dcabe60f85c35e8482121c8361526.webp?size=2048',
    },
    {
      name: 'DreamTeam',
      description: 'O DreamTeam é um simulador de futebol feito por brasileiros apaixonados por futebol. Com cartas únicas e originais de jogadores e clubes brasileiros, são mais de 1300 cartas colecionáveis (incluindo Pelé, Arrascaeta, Hulk, Ronaldinho e muito mais!) para que você possa fazer o seu time dos sonhos. Então venha em busca de fazer o melhor time do mundo!',
      status: {
        guilds: 1000,
        votes: 10000,
      },
      id: 'dreamteam',
      avatar: 'https://cdn.discordapp.com/avatars/1052214694020141178/9bda73f8a475951441d6fecc02f89f90.webp?size=2048',
    }
];

export default function Home() {
  const mostVotedBotsData = mostVotedBots.map((bot) => {
    return (
      // eslint-disable-next-line react/jsx-key
      <Link href={"/bots/" + bot.id}>
      <div className="botCard max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
            <Image className="botCardAvatar" src={bot.avatar} width="64" height="64" alt={bot.name} />
            <div className="botCardTitle">{bot.name}</div>
            <p className="botCardDescription">
                {bot.description.slice(0, 90)}
                {bot.description.length > 90 ? '...' : ''}
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Servidores: {bot.status.guilds}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Votos: {bot.status.votes}</span>
        </div>
      </div>
      </Link>
    );
  });
  return (
    <main>
        <Navbar />
        <section className="max-w-screen-xl mx-auto p-4 mt-10">
            <div>
                <h2 className="heroTitle">Explore os melhores bots brasileiros</h2>
                <h2 className="heroSubtitle">para seu servidor!</h2>
            </div>
            <form>
              <input type="text" className="searchInput" placeholder="Pesquisar bots..." />
              <button className="searchButton">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.873-4.873M10 16a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </button>
            </form>
        </section>
        <section className="max-w-screen-xl mx-auto p-4 mt-10" id="mostVotedBots">
            <div>
                <h2 className="heroTitle"><FontAwesomeIcon className="dcicon" width="24" height="24" icon={faFire}/>&nbsp;Mais votados</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mostVotedBotsData}
            </div>
        </section>
        <section className="max-w-screen-xl mx-auto p-4 mt-10" id="mostVotedBots">
            <div>
                <h2 className="heroTitle"><FontAwesomeIcon className="dcicon" width="24" height="24" icon={faClock}/>&nbsp;Adicionados recentemente</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mostVotedBotsData}
            </div>
        </section>
        <section className="max-w-screen-xl mx-auto p-4 mt-10" id="mostVotedBots">
            <div>
                <h2 className="heroTitle"><FontAwesomeIcon className="dcicon" width="24" height="24" icon={faChartBar}/>&nbsp;Mais usados</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mostVotedBotsData}
            </div>
        </section>
    </main>
  );
}
