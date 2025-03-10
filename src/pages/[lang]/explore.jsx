"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ThumbsUp,
  Server,
  Clock,
  Bot,
  TagIcon,
  ChevronDown,
  CheckIcon,
  XIcon,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

export default function ExplorePage() {
  const { t, lang } = useTranslation();
  const [bots, setBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("votes");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showUnverified, setShowUnverified] = useState(true);
  const router = useRouter();

  const tags = {
    en: [
      "Moderation",
      "Music",
      "Economy",
      "Fun",
      "Utilities",
      "Games",
      "Administration",
      "RPG",
      "Social",
      "Education",
    ],
    pt: [
      "Moderação",
      "Música",
      "Economia",
      "Diversão",
      "Utilidades",
      "Jogos",
      "Administração",
      "RPG",
      "Social",
      "Educação",
    ],
  };

  const localizedTags = tags[lang] || tags.pt;

  const fetchBots = useCallback(async () => {
    try {
      setIsLoading(true);
      // Using the /api/bots endpoint
      const response = await fetch(`/api/bots`);
      const data = await response.json();

      // Sort the bots based on the selected sort option
      let sortedBots = [...data];
      if (sortBy === "votes") {
        sortedBots.sort((a, b) => b.votes - a.votes);
      } else if (sortBy === "newest") {
        sortedBots.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (sortBy === "used") {
        sortedBots.sort((a, b) => b.servers - a.servers);
      }

      // Filter by tags if any are selected (simulated since we don't have tag data)
      if (selectedTags.length > 0) {
        // In a real implementation, you would filter by tags here
        // For now, we'll just simulate it by taking a subset of bots
        sortedBots = sortedBots.filter(
          (_, index) => index % (selectedTags.length + 1) === 0
        );
      }

      // Filter out unverified bots if showUnverified is false
      if (!showUnverified) {
        sortedBots = sortedBots.filter((bot) => bot.verified);
      }

      setBots(sortedBots);
    } catch (error) {
      console.error("Error fetching bots:", error);
      setBots([]);
    } finally {
      setIsLoading(false);
    }
  }, [sortBy, selectedTags, showUnverified]);

  useEffect(() => {
    fetchBots();
  }, [fetchBots]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/${lang}/bots/search?search=${searchTerm}`);
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
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
              {!bot.verified && (
                <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-0.5 border-2 border-white dark:border-gray-800">
                  <ShieldAlert className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                {bot.name}
              </h3>
              {!bot.verified && (
                <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {t("explore.notVerified")}
                </span>
              )}
            </div>
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

  const SkeletonBotCard = () => (
    <div className="h-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50">
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 mr-3 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4 animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("explore.title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("explore.subtitle")}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder={t("explore.searchPlaceholder")}
                  className="flex-1 px-4 py-3 rounded-l-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-r-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <div className="relative inline-block">
                <button
                  onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                >
                  <TagIcon className="w-4 h-4 mr-2" />
                  {t("explore.categories")}{" "}
                  {selectedTags.length > 0 && `(${selectedTags.length})`}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {showTagsDropdown && (
                  <div className="absolute z-10 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
                    <div className="max-h-60 overflow-y-auto py-1">
                      {localizedTags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          <div className="flex-shrink-0 w-5 h-5 mr-2">
                            {selectedTags.includes(tag) ? (
                              <CheckIcon className="w-5 h-5 text-primary" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-sm" />
                            )}
                          </div>
                          <span className="text-gray-700 dark:text-gray-200">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                    {selectedTags.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 px-3 py-1">
                        <button
                          className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                          onClick={() => setSelectedTags([])}
                        >
                          <XIcon className="w-3 h-3 mr-1" />
                          {t("explore.clearSelection")}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showUnverified}
                    onChange={() => setShowUnverified(!showUnverified)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("explore.showUnverified")}
                  </span>
                </label>
              </div>

              <div className="flex-1 flex justify-end">
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleSortChange("votes")}
                    className={`inline-flex items-center px-4 py-2 rounded-l-lg text-sm font-medium border ${
                      sortBy === "votes"
                        ? "bg-primary text-white border-primary"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {t("explore.votes")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSortChange("newest")}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium border-t border-b ${
                      sortBy === "newest"
                        ? "bg-primary text-white border-primary"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {t("explore.recent")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSortChange("used")}
                    className={`inline-flex items-center px-4 py-2 rounded-r-lg text-sm font-medium border ${
                      sortBy === "used"
                        ? "bg-primary text-white border-primary"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Server className="w-4 h-4 mr-2" />
                    {t("explore.popular")}
                  </button>
                </div>
              </div>
            </div>

            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="ml-1.5 text-primary hover:text-primary/80"
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bot Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 9 }).map((_, index) => (
                <SkeletonBotCard key={index} />
              ))
            ) : bots.length > 0 ? (
              bots.map((bot) => <BotCard key={bot._id} bot={bot} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <Bot className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t("explore.noBotsFound")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("explore.adjustFilters")}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
