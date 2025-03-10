"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Bot,
  ArrowLeft,
  Construction,
  Clock,
  Calendar,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function VotePage() {
  const router = useRouter();
  const { id } = router.query;
  const { t, lang } = useTranslation();
  const [botData, setBotData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchBot = async () => {
      try {
        const response = await fetch(`/api/bots/${id}`);
        const data = await response.json();
        setBotData(data);
      } catch (error) {
        console.error("Error fetching bot:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBot();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="animate-pulse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700/50 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-6">
              <div className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mt-4"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50 max-w-2xl mx-auto">
          <div className="bg-primary/10 dark:bg-primary/20 p-6 border-b border-gray-100 dark:border-gray-700/50">
            <Link
              href={`/${lang}/bots/${id}`}
              className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {isMounted ? (
                <ArrowLeft className="h-4 w-4 mr-1" />
              ) : (
                <span className="h-4 w-4 mr-1" />
              )}
              {t("common.back")}
            </Link>
            <div className="mt-4 flex items-center">
              {botData && (
                <div className="relative w-12 h-12 mr-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 ring-2 ring-primary/20">
                  <Image
                    src={botData.avatar || "/placeholder.svg"}
                    alt={botData.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                {botData ? botData.name : "Bot"} - {t("vote.title")}
              </h1>
            </div>
          </div>

          <div className="p-6 text-center space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <div className="flex items-center">
                {isMounted ? (
                  <Construction className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0" />
                ) : (
                  <span className="h-6 w-6 mr-3" />
                )}
                <div className="text-left">
                  <h3 className="font-medium text-amber-800 dark:text-amber-400">
                    {t("vote.systemNotReady")}
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 mt-1">
                    {t("vote.comingSoon")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div className="flex justify-center items-center mb-4">
                {isMounted ? (
                  <Clock className="h-10 w-10 text-primary mr-2" />
                ) : (
                  <span className="h-10 w-10 mr-2" />
                )}
                <div className="text-4xl font-bold text-gray-800 dark:text-white">
                  12:00:00
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {t("vote.cooldownExplain")}
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4 py-4">
              <button
                disabled={true}
                className="px-8 py-4 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed w-full max-w-xs font-bold text-lg flex items-center justify-center disabled:opacity-70"
              >
                {isMounted ? (
                  <AlertTriangle className="mr-2 h-5 w-5" />
                ) : (
                  <span className="mr-2 h-5 w-5" />
                )}
                {t("vote.voteButton")}
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("vote.developmentMessage")}
              </p>
              <div className="text-sm text-gray-400 dark:text-gray-500 flex items-center mt-4">
                {isMounted ? (
                  <Calendar className="mr-1 h-4 w-4" />
                ) : (
                  <span className="mr-1 h-4 w-4" />
                )}
                {t("vote.expectedReleaseDate")}: Q2 2025
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <Link
                href={`/${lang}/bots/${id}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                {isMounted ? (
                  <Bot className="mr-2 h-4 w-4" />
                ) : (
                  <span className="mr-2 h-4 w-4" />
                )}
                {t("vote.returnToBot")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
