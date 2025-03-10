"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  Edit,
  Settings,
  List,
  Grid,
  Plus,
  ThumbsUp,
  Server,
  Bot,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [userBots, setUserBots] = useState([]);
  const [votedBots, setVotedBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("mybots");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (!session) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Fetch user data
        const userResponse = await fetch(
          `/api/users/${session.session.user.id}`
        );
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch all bots
        const botsResponse = await fetch(`/api/bots`);
        const allBots = await botsResponse.json();

        // Filter user's bots
        if (userData.bots && userData.bots.length > 0) {
          const userBots = allBots.filter((bot) =>
            userData.bots.includes(bot._id)
          );
          setUserBots(userBots);
        }

        // For voted bots, we'll simulate since we don't have that endpoint
        // In a real implementation, you would fetch from a dedicated endpoint
        const simulatedVotedBots = allBots
          .filter((bot) => !userData.bots.includes(bot._id))
          .slice(0, 3); // Just take a few as an example
        setVotedBots(simulatedVotedBots);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const BotCard = ({ bot }) => (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg transition-all">
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="relative w-12 h-12 mr-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 ring-2 ring-primary/20">
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
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {bot.name}
            </h3>
            {!bot.verified && (
              <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Não verificado
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
          {bot.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            <Server className="w-3 h-3 mr-1" />
            {Number(bot.servers).toLocaleString("pt-BR")}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
            <ThumbsUp className="w-3 h-3 mr-1" />
            {Number(bot.votes).toLocaleString("pt-BR")}
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/bots/${bot._id}`}
            className="flex-1 text-center px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            Ver Detalhes
          </Link>
          <Link
            href={`/bots/edit/${bot._id}`}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );

  const BotListItem = ({ bot }) => (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg transition-all p-4">
      <div className="flex items-center">
        <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 ring-2 ring-primary/20">
          <Image
            src={bot.avatar || "/placeholder.svg"}
            alt={bot.name}
            fill
            className="object-cover"
            sizes="40px"
          />
          {!bot.verified && (
            <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-0.5 border-2 border-white dark:border-gray-800">
              <ShieldAlert className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {bot.name}
            </h3>
            {!bot.verified && (
              <span className="ml-2 text-xs text-yellow-600 dark:text-yellow-400 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Não verificado
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
            {bot.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            <Server className="w-3 h-3 mr-1" />
            {Number(bot.servers).toLocaleString("pt-BR")}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
            <ThumbsUp className="w-3 h-3 mr-1" />
            {Number(bot.votes).toLocaleString("pt-BR")}
          </span>
          <div className="flex gap-1 ml-2">
            <Link
              href={`/bots/${bot._id}`}
              className="p-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Ver
            </Link>
            <Link
              href={`/bots/${bot._id}/edit`}
              className="p-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center max-w-md mx-auto border border-gray-100 dark:border-gray-700/50">
            <Bot className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Você precisa estar logado para acessar seu perfil
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Faça login com sua conta Discord para gerenciar seus bots e
              configurações.
            </p>
            <button
              onClick={() => signIn("discord")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              Entrar com Discord
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        {/* Profile Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50 mb-8">
          <div className="bg-primary/10 h-32 relative"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-4 gap-4">
              <div className="relative">
                <Image
                  src={session.session.user.image || "/placeholder.svg"}
                  alt={userData?.username || session.session.user.name}
                  width={112}
                  height={112}
                  className="rounded-full border-4 border-white dark:border-gray-800 object-cover bg-white dark:bg-gray-700"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData?.username || session.session.user.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {userData?.description ||
                    "Membro desde " +
                      new Date(
                        userData?.createdAt || Date.now()
                      ).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/settings"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
            <div className="flex space-x-1 mb-4 sm:mb-0">
              <button
                onClick={() => setActiveTab("mybots")}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === "mybots"
                    ? "bg-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Meus Bots
              </button>
              <button
                onClick={() => setActiveTab("voted")}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === "voted"
                    ? "bg-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Bots Votados
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 shadow-sm"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 shadow-sm"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <Link
                href="/bots/add"
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Adicionar Bot
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700/50">
            <div className="animate-pulse space-y-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700/50">
            {activeTab === "mybots" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-primary" />
                  Meus Bots ({userBots.length})
                </h2>

                {userBots.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Você ainda não tem bots
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Que tal adicionar seu primeiro bot à nossa plataforma?
                    </p>
                    <Link
                      href="/bots/add"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Bot
                    </Link>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userBots.map((bot) => (
                      <BotCard key={bot._id} bot={bot} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {userBots.map((bot) => (
                      <BotListItem key={bot._id} bot={bot} />
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "voted" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <ThumbsUp className="w-5 h-5 mr-2 text-primary" />
                  Bots Votados ({votedBots.length})
                </h2>

                {votedBots.length === 0 ? (
                  <div className="text-center py-12">
                    <ThumbsUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Você ainda não votou em nenhum bot
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Explore nossa plataforma e vote nos bots que você gosta!
                    </p>
                    <Link
                      href="/explore"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
                    >
                      Explorar Bots
                    </Link>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {votedBots.map((bot) => (
                      <BotCard key={bot._id} bot={bot} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {votedBots.map((bot) => (
                      <BotListItem key={bot._id} bot={bot} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
