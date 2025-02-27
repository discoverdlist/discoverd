"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FlameIcon as Fire, Clock, BarChart3, Search } from "lucide-react";

export default function Home() {
  const [mostVotedBots, setMostVotedBots] = useState([]);
  const [newBots, setNewBots] = useState([]);
  const [usedBots, setUsedBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchBots = useCallback(async (filter, limit = 6) => {
    try {
      const response = await fetch(
        `/api/bots?filter=${filter}${limit ? `&limit=${limit}` : ""}`
      );
      const data = await response.json();
      const filtered = data.filter((bot) => bot.verified === true);

      switch (filter) {
        case "votes":
          setMostVotedBots(filtered);
          break;
        case "newest":
          setNewBots(filtered);
          break;
        case "used":
          setUsedBots(filtered);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching bots:", error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchBots("votes"),
        fetchBots("newest"),
        fetchBots("used"),
      ]);
      setIsLoading(false);
    };

    loadData();
  }, [fetchBots]);

  const search = async (e) => {
    e.preventDefault();
    const target = e.target;
    const searchInput = target.elements.namedItem("search");
    const searchValue = searchInput.value;

    if (searchValue) {
      await router.push(`/bots/search?search=${searchValue}`);
    }
  };

  const BotCard = ({ bot }) => (
    <Link
      href={`/bots/${bot._id}`}
      className="block transition-all duration-300 hover:translate-y-[-5px]"
    >
      <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="relative w-12 h-12 mr-4 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <Image
                src={bot.avatar || "/placeholder.svg"}
                alt={bot.name}
                fill
                className="object-cover"
                sizes="48px"
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
    </Link>
  );

  const BotGrid = ({ bots, isLoading }) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl h-48 animate-pulse"
            ></div>
          ))}
        </div>
      );
    }

    if (!bots || bots.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Nenhum bot encontrado
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <BotCard key={bot._id} bot={bot} />
        ))}
      </div>
    );
  };

  const SectionHeader = ({ icon, title }) => (
    <div className="flex items-center mb-6">
      <div className="mr-2 text-primary">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Explore os melhores bots brasileiros
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                para seu servidor!
              </p>

              <form onSubmit={search} className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    required
                    id="search"
                    name="search"
                    type="text"
                    className="w-full h-14 px-5 pr-16 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg"
                    placeholder="Pesquisar bots..."
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-14 w-14 flex items-center justify-center text-primary bg-white rounded-full"
                  >
                    <Search className="w-5 h-5" />
                    <span className="sr-only">Pesquisar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </section>

        {/* Content Sections */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Most Voted Bots */}
          <section className="mb-16" id="mostVotedBots">
            <SectionHeader
              icon={<Fire className="w-6 h-6" />}
              title="Mais votados"
            />
            <BotGrid bots={mostVotedBots} isLoading={isLoading} />
          </section>

          {/* Newest Bots */}
          <section className="mb-16" id="newestBots">
            <SectionHeader
              icon={<Clock className="w-6 h-6" />}
              title="Adicionados recentemente"
            />
            <BotGrid bots={newBots} isLoading={isLoading} />
          </section>

          {/* Most Used Bots */}
          <section className="mb-16" id="usedBots">
            <SectionHeader
              icon={<BarChart3 className="w-6 h-6" />}
              title="Mais usados"
            />
            <BotGrid bots={usedBots} isLoading={isLoading} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
