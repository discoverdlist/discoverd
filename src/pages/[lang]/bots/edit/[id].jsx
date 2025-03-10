"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "../../../../hooks/useTranslation";
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  LinkIcon,
  Github,
  MessageCircle,
  Bot,
  Info,
  Hash,
  FileText,
  Key,
  Loader2,
  DiscIcon as Discord,
  Save,
  Copy,
} from "lucide-react";

export default function EditBot() {
  const router = useRouter();
  const { data: session } = useSession();
  const [botId, setBotId] = useState(null);
  const [botData, setBotData] = useState({});
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t, lang } = useTranslation();

  const [formData, setFormData] = useState({
    id: "",
    invite: "",
    avatar: "",
    description: "",
    longDescription: "",
    website: "",
    github: "",
    support: "",
    owner: "",
    apiKey: "",
  });

  useEffect(() => {
    if (router.isReady) {
      setBotId(router.query.id); // desde que a rota tenha esse parâmetro dinâmico
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (!router.isReady || !session) return;

    const id = router.query.id;
    if (!id) return;

    const fetchBot = async () => {
      try {
        const response = await fetch(`/api/bots/${id}?apiKey=true`);
        const data = await response.json();

        if (data.owner !== session.session.user.id) {
          router.push(`/${lang}`);
          return;
        }

        setBotData(data);
        setFormData({
          id: data._id,
          invite:
            data.invite ||
            `https://discord.com/oauth2/authorize?client_id=${data._id}&permissions=8&scope=bot%20applications.commands`,
          avatar: data.avatar || "",
          description: data.description || "",
          longDescription: data.longDescription || "",
          website: data.website || "",
          github: data.github || "",
          support: data.support || "",
          owner: data.owner || "",
          apiKey: data.apiKey || "",
        });
      } catch (error) {
        console.error("Error fetching bot:", error);
        setError(t("errors.unexpectedError"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBot();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/bots/edit/${botId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/${lang}/bots/${botId}?edit=success`);
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || t("errors.unexpectedError"));
      }
    } catch (error) {
      console.error("Erro inesperado", error);
      setError(t("errors.unexpectedError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(botData.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center max-w-md mx-auto border border-gray-100 dark:border-gray-700/50">
            <Bot className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("editBot.loginRequired")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("editBot.loginRequiredDesc")}
            </p>
            <button
              onClick={() => signIn("discord")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              <Discord className="mr-2 h-4 w-4" />
              {t("common.loginWithDiscord")}
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="animate-pulse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-3xl mx-auto border border-gray-100 dark:border-gray-700/50">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/6 mb-8"></div>

            <div className="space-y-6">
              <div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4 mb-2"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              </div>
              <div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mb-2"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              </div>
              <div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4 mb-2"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div
              className="bg-red-100/90 backdrop-blur-sm border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm"
              role="alert"
            >
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div
              className="bg-green-100/90 backdrop-blur-sm border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-sm"
              role="alert"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                <p>{t("botPage.editSuccessDesc")}</p>
              </div>
            </div>
          )}

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 overflow-hidden mb-6">
            <div className="bg-primary/10 dark:bg-primary/20 p-6 border-b border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center">
                {botData.avatar && (
                  <div className="relative w-12 h-12 mr-4 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 ring-2 ring-primary/20">
                    <Image
                      src={botData.avatar || "/placeholder.svg"}
                      alt={botData.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                    {t("editBot.title", { botName: botData.name })}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {t("editBot.subtitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-gray-100 dark:border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Key className="h-5 w-5 mr-2 text-primary" />
                {t("addBot.apiKey")}
              </h2>
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 font-mono text-sm bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
                    <p
                      className={`text-gray-700 dark:text-gray-300 ${
                        showApiKey ? "" : "filter blur-sm"
                      }`}
                    >
                      {botData.apiKey}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4 mr-2" />
                      ) : (
                        <Eye className="h-4 w-4 mr-2" />
                      )}
                      {showApiKey ? t("common.hide") : t("common.show")}
                    </button>
                    <button
                      type="button"
                      onClick={copyApiKey}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      disabled={!showApiKey}
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copied ? t("common.copied") : t("common.copy")}
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {t("addBot.apiKeyNote")}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
                      htmlFor="id"
                    >
                      <Hash className="h-4 w-4 mr-1 text-primary" />
                      {t("addBot.botId")}
                    </label>
                    <input
                      type="number"
                      id="id"
                      name="id"
                      value={formData.id}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 cursor-not-allowed"
                      disabled
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
                      htmlFor="description"
                    >
                      <Info className="h-4 w-4 mr-1 text-primary" />
                      {t("addBot.shortDescription")}
                    </label>
                    <input
                      minLength={50}
                      maxLength={250}
                      placeholder={t("addBot.shortDescriptionPlaceholder")}
                      required
                      type="text"
                      id="description"
                      name="description"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      onChange={handleChange}
                      value={formData.description}
                    />
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                      <span>{t("addBot.minChars", { count: 50 })}</span>
                      <span>{formData.description.length}/250</span>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
                      htmlFor="invite"
                    >
                      <LinkIcon className="h-4 w-4 mr-1 text-primary" />
                      {t("addBot.botInvite")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("addBot.botInvitePlaceholder")}
                      id="invite"
                      name="invite"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      onChange={handleChange}
                      value={formData.invite}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {t("addBot.botInviteNote")}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
                      htmlFor="website"
                    >
                      <LinkIcon className="h-4 w-4 mr-1 text-primary" />
                      {t("addBot.website")}
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder={t("addBot.websitePlaceholder")}
                      onChange={handleChange}
                      value={formData.website}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
                      htmlFor="github"
                    >
                      <Github className="h-4 w-4 mr-1 text-primary" />
                      {t("addBot.github")}
                    </label>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder={t("addBot.githubPlaceholder")}
                      onChange={handleChange}
                      value={formData.github}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
                      htmlFor="support"
                    >
                      <MessageCircle className="h-4 w-4 mr-1 text-primary" />
                      {t("addBot.supportServer")}
                    </label>
                    <input
                      type="text"
                      id="support"
                      name="support"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder={t("addBot.supportServerPlaceholder")}
                      onChange={handleChange}
                      value={formData.support}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
                  htmlFor="longDescription"
                >
                  <FileText className="h-4 w-4 mr-1 text-primary" />
                  {t("addBot.detailedDescription")}
                </label>
                <textarea
                  placeholder={t("addBot.detailedDescriptionPlaceholder")}
                  minLength={250}
                  maxLength={4000}
                  id="longDescription"
                  name="longDescription"
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 h-40 resize-none"
                  onChange={handleChange}
                  value={formData.longDescription}
                ></textarea>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                  <span>{t("addBot.minChars", { count: 250 })}</span>
                  <span>{formData.longDescription.length}/4000</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  href={`/${lang}/bots/${botId}`}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 text-center"
                >
                  {t("common.cancel")}
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      {t("editBot.saving")}
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      {t("editBot.saveChanges")}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
