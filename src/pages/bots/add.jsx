"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router"; // Changed back to next/router
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
  Key,
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
        setTimeout(() => router.push("/"), 3000); // Redirect after 3 seconds
      } else {
        const errorData = await response.json();
        setFormStatus("error");
        setErrorMessage(getErrorMessage(response.status, errorData.message));
      }
    } catch (error) {
      console.error("[@discoverd/logs] Erro inesperado", error);
      setFormStatus("error");
      setErrorMessage(
        "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (status, message) => {
    const errorMessages = {
      400: "Requisição inválida",
      401: "Não autorizado",
      403: "Proibido",
      404: "Bot não encontrado ou não existente",
      409: "Bot já adicionado",
      500: "Erro interno do servidor",
    };
    return message || errorMessages[status] || "Erro inesperado";
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
        owner: session?.session?.user?.id || "", // Fixed to match original code
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
              Você precisa estar logado para adicionar um bot
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Faça login com sua conta Discord para continuar.
            </p>
            <button
              onClick={() => signIn("discord")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              <Discord className="mr-2 h-4 w-4" />
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
        <div className="max-w-3xl mx-auto">
          {formStatus === "success" && (
            <div
              className="bg-green-100/90 backdrop-blur-sm border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-sm"
              role="alert"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                <p>Bot adicionado com sucesso! Redirecionando...</p>
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
                Adicione seu bot à nossa lista
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Preencha o formulário abaixo com os detalhes do seu bot Discord
              </p>
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
                      ID do bot
                    </label>
                    <input
                      required
                      type="number"
                      placeholder="ID do seu bot no Discord"
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
                      Descrição curta
                    </label>
                    <input
                      minLength={50}
                      maxLength={250}
                      placeholder="Breve descrição do seu bot"
                      required
                      type="text"
                      id="description"
                      name="description"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      onChange={handleChange}
                      value={formData.description}
                    />
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                      <span>Mínimo: 50 caracteres</span>
                      <span>{formData.description.length}/250</span>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
                      htmlFor="invite"
                    >
                      <LinkIcon className="h-4 w-4 mr-1 text-primary" />
                      Convite do bot
                    </label>
                    <input
                      type="text"
                      placeholder="https://discord.com/oauth2/authorize?client_id=ID&permissions=0&scope=bot%20applications.commands"
                      id="invite"
                      name="invite"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      onChange={handleChange}
                      value={formData.invite}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Se deixado em branco, criaremos um automaticamente
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
                      Website do bot
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="https://seubot.com"
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
                      GitHub do bot
                    </label>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="https://github.com/seubot"
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
                      Servidor de suporte
                    </label>
                    <input
                      type="text"
                      id="support"
                      name="support"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="https://discord.gg/seuservidor"
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
                  Descrição detalhada do bot
                </label>
                <textarea
                  placeholder="Descreva detalhadamente as funcionalidades do seu bot"
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
                  <span>Mínimo: 250 caracteres</span>
                  <span>{formData.longDescription.length}/4000</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Key className="h-4 w-4 mr-1 text-primary" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    API Key (gerada automaticamente)
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value={formData.apiKey}
                    className="block w-full px-4 py-3 rounded-l-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, apiKey: generateApiKey() })
                    }
                    className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-r-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Gerar novo
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Guarde esta chave em um local seguro. Você precisará dela para
                  gerenciar seu bot.
                </p>
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
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Bot
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <input
        type="hidden"
        id="owner"
        name="owner"
        ref={ownerRef}
        value={session.session?.user?.id || ""}
      />
    </div>
  );
}
