"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks/useTranslation";
import {
  AlertCircle,
  CheckCircle,
  LinkIcon,
  Github,
  MessageCircle,
  Bot,
  Info,
  Hash,
  FileText,
  ArrowRight,
  Loader2,
  DiscIcon as Discord,
} from "lucide-react";

export default function CreateBot() {
  const router = useRouter();
  const { data: session } = useSession();
  const ownerRef = useRef();
  const [botBlock, setBotBlock] = useState({});
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, lang } = useTranslation();

  const generateApiKey = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

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
    apiKey: generateApiKey(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ownerValue = ownerRef.current.value;

    try {
      const response = await fetch("/api/bots/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify({ ...formData, owner: ownerValue }),
      });

      if (response.ok) {
        setFormStatus("success");
        setTimeout(() => router.push(`/${lang}`), 3000); // Redirect after 3 seconds
      } else {
        const errorData = await response.json();
        setFormStatus("error");
        setErrorMessage(getErrorMessage(response.status, errorData.message));
      }
    } catch (error) {
      console.error("[@discoverd/logs] Erro inesperado", error);
      setFormStatus("error");
      setErrorMessage(t("addBot.unexpectedError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (status, message) => {
    if (message) return message;

    const errorKey =
      {
        400: "invalidRequest",
        401: "unauthorized",
        403: "forbidden",
        404: "botNotFound",
        409: "botAlreadyAdded",
        500: "serverError",
      }[status] || "unexpectedError";

    return t(`errors.${errorKey}`);
  };

  const handleChange = useCallback(async (e) => {
    if (e.target.name === "id" && e.target.value !== "") {
      fetchBotDetails(e.target.value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const fetchBotDetails = async (botId) => {
    try {
      const response = await fetch(`/api/bots/botblock/${botId}`);
      const data = await response.json();
      setBotBlock(data || {});
    } catch (error) {
      console.error("Error fetching bot:", error);
    }
  };

  useEffect(() => {
    if (botBlock?.id) {
      setFormData((prevData) => ({
        ...prevData,
        id: botBlock.id,
        invite: botBlock.invite || "",
        avatar: botBlock.avatar || "",
        description: botBlock.description || "",
        longDescription: botBlock.longDescription || "",
        website: botBlock.website || "",
        github: botBlock.github || "",
        support: botBlock.support || "",
        owner: session?.session?.user?.id || "",
      }));
    }
  }, [botBlock, session]);

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center max-w-md mx-auto border border-gray-100 dark:border-gray-700/50">
            <Bot className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("addBot.loginRequired")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("addBot.loginRequiredDesc")}
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          {formStatus === "success" && (
            <div
              className="bg-green-100/90 backdrop-blur-sm border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-sm"
              role="alert"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                <p>{t("addBot.botAddedSuccess")}</p>
              </div>
            </div>
          )}
          {formStatus === "error" && (
            <div
              className="bg-red-100/90 backdrop-blur-sm border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm"
              role="alert"
            >
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 overflow-hidden">
            <div className="bg-primary/10 dark:bg-primary/20 p-6 border-b border-gray-100 dark:border-gray-700/50">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <Bot className="h-6 w-6 mr-2 text-primary" />
                {t("addBot.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t("addBot.subtitle")}
              </p>
              <div className="mt-2">
                <a
                  href={`/${lang}/bot-requirements`}
                  className="text-sm text-primary hover:text-primary/80 flex items-center"
                >
                  <Info className="h-4 w-4 mr-1" />
                  {t("addBot.viewRequirements")}
                </a>
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
                      required
                      type="number"
                      placeholder={t("addBot.botIdPlaceholder")}
                      id="id"
                      name="id"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      onChange={handleChange}
                      value={formData.id}
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

              <div className="pt-4">
                <button
                  type="submit"
                  id="sendButton"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      {t("common.sending")}
                    </>
                  ) : (
                    <>
                      {t("addBot.submitBot")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <>
        <input
          type="hidden"
          id="owner"
          name="owner"
          ref={ownerRef}
          value={session.session?.user?.id || ""}
        />
        <input
          type="hidden"
          id="apiKey"
          name="apiKey"
          value={formData.apiKey}
        />
      </>
    </div>
  );
}
