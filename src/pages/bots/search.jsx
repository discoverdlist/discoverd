"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

export default function SearchBots() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("search");
    setSearchQuery(query || "");

    const fetchBots = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `/api/bots/search?search=${encodeURIComponent(query)}`
          );
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching bots:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBots();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    if (search) {
      window.location.href = `/bots/search?search=${encodeURIComponent(
        search
      )}`;
    }
  };

  const renderBotCards = (bots) => {
    if (isLoading) {
      return Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-48"
          ></div>
        ));
    }

    if (!bots || bots.length === 0 || bots.message) {
      return (
        <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
          Nenhum bot encontrado
        </p>
      );
    }

    return bots.map((bot) => (
      <Link href={`/bots/${bot._id}`} key={bot._id}>
        <div className="block transition-all duration-300 hover:translate-y-[-5px]">
          <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={bot.avatar || "/placeholder.svg"}
                    alt={bot.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                  {bot.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {bot.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {Number(bot.servers).toLocaleString("pt-BR")} servidores
                </span>
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {Number(bot.votes).toLocaleString("pt-BR")} votos
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <section className="max-w-screen-xl mx-auto p-4 mt-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore os melhores bots brasileiros
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            para seu servidor!
          </p>
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex">
              <input
                required
                id="search"
                name="search"
                type="text"
                defaultValue={searchQuery}
                className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                placeholder="Pesquisar bots..."
              />
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                Pesquisar
              </button>
            </div>
          </form>
        </section>
        <section
          className="max-w-screen-xl mx-auto p-4 mt-10"
          id="searchResults"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
            Bots encontrados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderBotCards(searchResults)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
