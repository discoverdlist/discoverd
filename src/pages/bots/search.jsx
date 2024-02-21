import Link from "next/link"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.jsx";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';

export default function Home() {
  const [mostVotedBots, setMostVotedBots] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')
  console.log(searchQuery);
  useEffect(() => {
    const fetchBots = async (filter, query) => {
      try {
        if (filter === 'search' && query) {
          const response = await fetch(`/api/bots/search?search=${encodeURIComponent(query)}`);
          const data = await response.json();
          setMostVotedBots(data);
        }
      } catch (error) {
        console.error("Error fetching most voted bots:", error);
      }
    };
    fetchBots('search', searchQuery);
  }, [searchQuery]);

  const search = (e) => {
    e.preventDefault();
    const search = e.target[0].value;
    if (search) {
      router.push(`/bots/search?search=${search}`);
    }
  };

  const renderBotCards = (bots) => {
    if (bots.message) return <p className="placeHolderBotsText">Nenhum bot encontrado</p>;
    if (bots.length === 0 || bots === undefined || bots === null) {
      return <p className="placeHolderBotsText">Nenhum bot encontrado</p>;
    } else {
      return bots.map((bot) => (
      <Link href={"/bots/" + bot._id} key={bot._id}>
        <div className="botCard max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <Image className="botCardAvatar" src={bot.avatar} width="64" height="64" alt={bot.name} />
            <div className="botCardTitle">{bot.name}</div>
            <p className="botCardDescription">
              {bot.description.slice(0, 90)}
              {bot.description.length > 90 ? "..." : ""}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              Servidores: {Number(bot.servers).toLocaleString('pt-BR')}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              Votos: {Number(bot.votes).toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      </Link>
    ));
    }
  };
  return (
    <main>
        <Navbar />
        <section className="max-w-screen-xl mx-auto p-4 mt-10">
            <div>
                <h2 className="heroTitle">Explore os melhores bots brasileiros</h2>
                <h2 className="heroSubtitle">para seu servidor!</h2>
            </div>
            <form onSubmit={search}>
              <input required="true" defaultValue={searchQuery} id="search" type="text" className="searchInput" placeholder="Pesquisar bots..." />
              <button type="submit" className="searchButton">
                <svg className="dcicon w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.873-4.873M10 16a6 6 0 100-12 6 6 0 000 12z" />
                </svg>&nbsp;Pesquisar
              </button>
            </form>
        </section>
        <section className="max-w-screen-xl mx-auto p-4 mt-10" id="mostVotedBots">
            <div>
                <h2 className="heroTitle"><FontAwesomeIcon className="dcicon" width="24" height="24" icon={faMagnifyingGlass}/>&nbsp;Bots encontrados</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderBotCards(mostVotedBots)}
            </div>
        </section>
    </main>
  );
}
