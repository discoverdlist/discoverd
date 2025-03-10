"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  BarChart3,
  ThumbsUp,
  Server,
  Bot,
  Search,
  ArrowLeft,
} from "lucide-react";
import { useTranslation } from "../../../hooks/useTranslation";

export default function PopularBotsPage() {
  const [bots, setBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchBots = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/bots?filter=used&limit=24`);
      const data = await response.json();
      const filtered = data.filter((bot) => bot.verified === true);
      setBots(filtered);
    } catch (error) {
      console.error("Error fetching bots:", error);
      setBots([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBots();
  }, [fetchBots]);

  const search = async (e) => {
    e.preventDefault();
    const target = e.target;
    const searchInput = target.elements.namedItem("search");
    const searchValue = searchInput.value;

    if (searchValue) {
      await router.push(`/${lang}/bots/search?search=${searchValue}`);
    }
  };

  const BotCard = ({ bot }) => (
    <Link href={`/${lang}/bots/${bot._id}`} className="group block">
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
              {Number(bot.servers).toLocaleString(
                lang === "en" ? "en-US" : "pt-BR"
              )}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {Number(bot.votes).toLocaleString(
                lang === "en" ? "en-US" : "pt-BR"
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors mb-4"
            >
              {isMounted ? (
                <ArrowLeft className="h-4 w-4 mr-1" />
              ) : (
                <span className="h-4 w-4 mr-1" />
              )}
              {t("common.back")}
            </Link>
            <div className="flex items-center mb-4">
              <div className="mr-3 text-primary bg-primary/10 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("popularBots.title")}
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              {t("popularBots.description")}
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <form onSubmit={search} className="max-w-xl">
              <div className="relative">
                <input
                  required
                  id="search"
                  name="search"
                  type="text"
                  className="w-full h-12 px-4 pr-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder={t("home.hero.searchPlaceholder")}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 h-10 w-10 flex items-center justify-center text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                  <span className="sr-only">{t("common.search")}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Bot Grid */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100/50 dark:bg-gray-800/20 rounded-xl h-[180px] animate-pulse"
                  ></div>
                ))}
              </div>
            ) : bots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {bots.map((bot) => (
                  <BotCard key={bot._id} bot={bot} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50/50 dark:bg-gray-800/20 rounded-xl">
                <Bot className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {t("common.notFound")}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
