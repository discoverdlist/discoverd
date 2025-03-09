"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FlameIcon,
  Clock,
  BarChart3,
  Search,
  Server,
  ThumbsUp,
  ArrowRight,
  Bot,
} from "lucide-react";

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
    <Link href={`/bots/${bot._id}`} className="group block">
      <div className="h-full bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-5">
          <div className="flex items-center mb-3">
            <div className="relative w-12 h-12 mr-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
              <Image
                src={bot.avatar || "/placeholder.svg"}
                alt={bot.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
              {bot.name}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
            {bot.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
              <Server className="w-3 h-3 mr-1" />
              {Number(bot.servers).toLocaleString("pt-BR")}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {Number(bot.votes).toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  const BotGrid = ({ bots, isLoading }) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100/50 dark:bg-gray-800/20 rounded-xl h-[180px] animate-pulse"
            ></div>
          ))}
        </div>
      );
    }

    if (!bots || bots.length === 0) {
      return (
        <div className="text-center py-10 bg-gray-50/50 dark:bg-gray-800/20 rounded-xl">
          <Bot className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Nenhum bot encontrado
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bots.map((bot) => (
          <BotCard key={bot._id} bot={bot} />
        ))}
      </div>
    );
  };

  const SectionHeader = ({ icon, title, viewAllLink }) => (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center">
        <div className="mr-2 text-primary bg-primary/10 p-2 rounded-lg">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
        >
          Ver todos
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-0"></div>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] z-0"></div>

          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
                Explore os melhores bots brasileiros
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                para seu servidor Discord!
              </p>

              <form onSubmit={search} className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    required
                    id="search"
                    name="search"
                    type="text"
                    className="w-full h-14 px-5 pr-16 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl bg-white/95 backdrop-blur-sm"
                    placeholder="Pesquisar bots..."
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 h-12 w-12 flex items-center justify-center text-white bg-primary hover:bg-primary/90 rounded-full transition-colors"
                  >
                    <Search className="w-5 h-5" />
                    <span className="sr-only">Pesquisar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Most Voted Bots */}
          <section
            className="mb-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50"
            id="mostVotedBots"
          >
            <SectionHeader
              icon={<FlameIcon className="w-5 h-5" />}
              title="Mais votados"
              viewAllLink="/bots/top"
            />
            <BotGrid bots={mostVotedBots} isLoading={isLoading} />
          </section>

          {/* Newest Bots */}
          <section
            className="mb-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50"
            id="newestBots"
          >
            <SectionHeader
              icon={<Clock className="w-5 h-5" />}
              title="Adicionados recentemente"
              viewAllLink="/bots/new"
            />
            <BotGrid bots={newBots} isLoading={isLoading} />
          </section>

          {/* Most Used Bots */}
          <section
            className="mb-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50"
            id="usedBots"
          >
            <SectionHeader
              icon={<BarChart3 className="w-5 h-5" />}
              title="Mais usados"
              viewAllLink="/bots/popular"
            />
            <BotGrid bots={usedBots} isLoading={isLoading} />
          </section>
        </div>
      </main>
    </div>
  );
}
