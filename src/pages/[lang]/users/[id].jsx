"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Bot,
  Calendar,
  ThumbsUp,
  Server,
  Clock,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "../../../hooks/useTranslation";

export default function UserProfilePage() {
  const router = useRouter();
  const { id, lang } = router.query;
  const { t } = useTranslation();
  const { data: session } = useSession();

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userBots, setUserBots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch user data when ID is available
  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (userId) => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch user data
      const userRes = await fetch(`/api/users/${userId}`);

      if (!userRes.ok) {
        throw new Error(`Failed to fetch user: ${userRes.status}`);
      }

      const userData = await userRes.json();
      setUserData(userData);

      // Fetch user's bots if they have any
      if (userData.bots && userData.bots.length > 0) {
        const botsPromises = userData.bots.map((botId) =>
          fetch(`/api/bots/${botId}`).then((res) => {
            if (!res.ok) return null;
            return res.json();
          })
        );

        const botsData = await Promise.all(botsPromises);
        setUserBots(botsData.filter((bot) => bot !== null));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message || "Failed to load user profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Safety timeout to ensure the page doesn't get stuck in loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.warn(
          "Loading timeout reached, forcing loading state to complete"
        );
        setIsLoading(false);
        if (!userData && !error) {
          setError("Loading timeout reached. Please try refreshing the page.");
        }
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeoutId);
  }, [isLoading, userData, error]);

  // Function to determine user role badge
  const getUserRoleBadge = (user) => {
    if (!user) return null;

    if (user.admin) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-rose-100/80 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200 border border-rose-200 dark:border-rose-800/30">
          <ShieldAlert className="w-3 h-3 mr-1" />
          Administrador
        </span>
      );
    } else if (user.moderator) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/30">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Moderador
        </span>
      );
    } else if (user.staff) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800/30">
          <Shield className="w-3 h-3 mr-1" />
          Staff
        </span>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="flex items-center mb-8">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mr-6"></div>
                <div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
              </div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-48 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/${lang || "en"}`}
              className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors mb-6"
            >
              {isMounted ? (
                <ArrowLeft className="h-4 w-4 mr-1" />
              ) : (
                <span className="h-4 w-4 mr-1" />
              )}
              {t("common.back")}
            </Link>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 p-6 text-center">
              <div className="mb-4">
                <Bot className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("profile.userNotFound") || "User Not Found"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error ||
                  t("profile.userNotFoundDesc") ||
                  "The user you are looking for does not exist or has been removed."}
              </p>
              <Link
                href={`/${lang || "en"}`}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                {t("botPage.backToHome")}
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === "en" ? "en-US" : "pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isOwnProfile =
    session?.user?.id === id || session?.session?.user?.id === id;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${lang || "en"}`}
            className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors mb-6"
          >
            {isMounted ? (
              <ArrowLeft className="h-4 w-4 mr-1" />
            ) : (
              <span className="h-4 w-4 mr-1" />
            )}
            {t("common.back")}
          </Link>

          {/* User Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0 md:mr-6 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 ring-4 ring-primary/20">
                  {userData.avatar ? (
                    <Image
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.username}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 96px, 128px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                      <Bot className="w-16 h-16" />
                    </div>
                  )}
                </div>

                <div className="text-center md:text-left flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                          {userData.username}
                        </h1>
                        {getUserRoleBadge(userData)}
                      </div>
                      <div className="flex items-center justify-center md:justify-start text-gray-500 dark:text-gray-400 mb-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">
                          {t("profile.memberSince")}{" "}
                          {formatDate(userData.createdAt)}
                        </span>
                      </div>
                    </div>

                    {isOwnProfile && (
                      <Link
                        href={`/${lang || "en"}/settings`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4 md:mt-0"
                      >
                        {t("profile.editProfile")}
                      </Link>
                    )}
                  </div>

                  {userData.description && (
                    <div className="mt-4 text-gray-600 dark:text-gray-300 text-left">
                      <p>{userData.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* User's Bots */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Bot className="w-5 h-5 mr-2 text-primary" />
                {userData.username}&quot;s {t("profile.myBots")}
              </h2>

              {userBots.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userBots.map((bot) => (
                    <Link
                      key={bot._id}
                      href={`/${lang || "en"}/bots/${bot._id}`}
                      className="group block bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 transition-colors"
                    >
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-800 relative">
                        {bot.avatar ? (
                          <Image
                            src={bot.avatar || "/placeholder.svg"}
                            alt={bot.name}
                            fill
                            className="object-cover group-hover:opacity-90 transition-opacity"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                            <Bot className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                          {bot.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                          {bot.description || bot.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {bot.votes > 0 && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {Number(bot.votes).toLocaleString(
                                lang === "en" ? "en-US" : "pt-BR"
                              )}{" "}
                              {t("botCard.votes")}
                            </span>
                          )}
                          {bot.servers > 0 && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                              <Server className="w-3 h-3 mr-1" />
                              {Number(bot.servers).toLocaleString(
                                lang === "en" ? "en-US" : "pt-BR"
                              )}{" "}
                              {t("botCard.servers")}
                            </span>
                          )}
                          {bot.createdAt && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100/80 text-gray-800 dark:bg-gray-800/50 dark:text-gray-200">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(bot.createdAt).toLocaleDateString(
                                lang === "en" ? "en-US" : "pt-BR"
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <Bot className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {t("profile.noBotsYet")}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    {userData.username} {t("profile.hasNotAddedBots")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {t("profile.stats") || "User Stats"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 text-center">
                  <Bot className="w-8 h-8 mx-auto text-primary mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userBots.length}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("profile.bots") || "Bots"}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 text-center">
                  <Server className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userData.servers?.length || 0}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("profile.servers") || "Servers"}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 text-center">
                  <Calendar className="w-8 h-8 mx-auto text-green-500 mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.floor(
                      (new Date() - new Date(userData.createdAt)) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("profile.daysAsMember") || "Days as Member"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
