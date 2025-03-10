"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  ThumbsUp,
  Clock,
  ArrowLeft,
  Bot,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "../../../../hooks/useTranslation";
import { useSession } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";

export default function VotePage() {
  const router = useRouter();
  const { id, lang } = router.query;
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const recaptchaRef = useRef(null);

  const [bot, setBot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [voteStatus, setVoteStatus] = useState(null);
  const [cooldown, setCooldown] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchBot = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/bots/${id}`);
        const data = await res.json();

        if (res.ok) {
          setBot(data);
        } else {
          console.error("Error fetching bot:", data);
        }
      } catch (error) {
        console.error("Error fetching bot:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBot();
  }, [id]);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
  };

  const handleVote = async () => {
    if (!session || !id || !recaptchaToken) return;

    try {
      setIsVoting(true);
      setVoteStatus(null);

      const res = await fetch("/api/bots/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify({
          userId: session.session.user.id,
          botId: id,
          recaptchaToken: recaptchaToken,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setVoteStatus({
          type: "success",
          message: data.message || t("vote.voteSuccess"),
        });
        if (bot) {
          setBot({
            ...bot,
            votes: (bot.votes || 0) + 1,
          });
        }
      } else if (res.status === 429) {
        setVoteStatus({
          type: "cooldown",
          message: data.message || t("vote.alreadyVoted"),
        });

        if (data.retryAfter) {
          setCooldown(data.retryAfter);
        }
      } else {
        setVoteStatus({
          type: "error",
          message: data.message || t("vote.voteError"),
        });
      }

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);
    } catch (error) {
      console.error("Error voting:", error);
      setVoteStatus({
        type: "error",
        message: t("vote.voteError"),
      });

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);
    } finally {
      setIsVoting(false);
    }
  };

  const formatCooldown = (cooldown) => {
    if (!cooldown) return "";

    const { hours, minutes } = cooldown;
    let result = "";

    if (hours > 0) {
      result += `${hours}${t("vote.hours")} `;
    }

    if (minutes > 0 || hours === 0) {
      result += `${minutes}${t("vote.minutes")}`;
    }

    return result.trim();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="animate-pulse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700/50 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="space-y-4 w-full max-w-md">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6 mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center max-w-md mx-auto border border-gray-100 dark:border-gray-700/50">
            <Bot className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("botPage.botNotFound")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("botPage.botNotFoundDesc")}
            </p>
            <Link
              href={`/${lang || "en"}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              {t("botPage.backToHome")}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${lang || "en"}/bots/${id}`}
            className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors mb-8"
          >
            {isMounted ? (
              <ArrowLeft className="h-4 w-4 mr-1" />
            ) : (
              <span className="h-4 w-4 mr-1" />
            )}
            {t("common.back")}
          </Link>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50">
            <div className="p-6 md:p-8">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 mb-4">
                  <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg">
                    <Image
                      src={
                        bot.avatar || "/placeholder.svg?height=128&width=128"
                      }
                      alt={bot.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {bot.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 max-w-lg mx-auto">
                    {bot.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {Number(bot.votes || 0).toLocaleString(
                        lang === "en" ? "en-US" : "pt-BR"
                      )}{" "}
                      {t("botCard.votes")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t("vote.title")}
                </h2>

                {status === "loading" ? (
                  <div className="text-center py-4">
                    <div className="animate-pulse h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
                  </div>
                ) : status === "unauthenticated" ? (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                          {t("vote.loginRequired")}
                        </h3>
                        <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                          {t("vote.loginRequiredDesc")}
                        </p>
                        <div className="mt-3">
                          <Link
                            href={`/api/auth/signin?callbackUrl=${encodeURIComponent(
                              `/${lang || "en"}/bots/${id}/vote`
                            )}`}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            {t("common.loginWithDiscord")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {voteStatus && (
                      <div
                        className={`rounded-lg p-4 mb-6 ${
                          voteStatus.type === "success"
                            ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-800 dark:text-green-300"
                            : voteStatus.type === "cooldown"
                            ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 text-amber-800 dark:text-amber-300"
                            : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-800 dark:text-red-300"
                        }`}
                      >
                        <p>{voteStatus.message}</p>
                        {voteStatus.type === "cooldown" && cooldown && (
                          <p className="mt-2 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {t("vote.tryAgainIn")} {formatCooldown(cooldown)}
                          </p>
                        )}
                      </div>
                    )}

                    {voteStatus?.type !== "cooldown" &&
                      voteStatus?.type !== "success" && (
                        <div className="mb-6">
                          <div className="flex items-center mb-4">
                            <ShieldCheck className="w-5 h-5 text-primary mr-2" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {t("vote.securityCheck")}
                            </h3>
                          </div>
                          <div className="flex justify-center">
                            {isMounted && (
                              <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6LcWivAqAAAAAPP19R-i4Ea1ZiRUpnzr2n79uusC"
                                onChange={handleRecaptchaChange}
                                onExpired={handleRecaptchaExpired}
                                hl={lang || "en"}
                                theme={
                                  document.documentElement.classList.contains(
                                    "dark"
                                  )
                                    ? "dark"
                                    : "light"
                                }
                                size="normal"
                              />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                            {t("vote.recaptchaDisclaimer")}
                          </p>
                        </div>
                      )}

                    <div className="text-center mt-6">
                      <button
                        onClick={handleVote}
                        disabled={
                          isVoting ||
                          voteStatus?.type === "cooldown" ||
                          voteStatus?.type === "success" ||
                          !recaptchaToken
                        }
                        className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-colors ${
                          isVoting ||
                          voteStatus?.type === "cooldown" ||
                          voteStatus?.type === "success" ||
                          !recaptchaToken
                            ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5 mr-2" />
                        {isVoting ? t("vote.voting") : t("vote.voteButton")}
                      </button>

                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        {t("vote.cooldownExplain")}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
