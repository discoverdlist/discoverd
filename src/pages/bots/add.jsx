"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  AlertCircle,
  CheckCircle,
  Link,
  Github,
  MessageCircle,
} from "lucide-react";

export default function CreateBot() {
  const router = useRouter();
  const { data: session } = useSession();
  const ownerRef = useRef();
  const [botBlock, setBotBlock] = useState({});
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState("");

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
        owner: session?.user?.id || "",
      }));
    }
  }, [botBlock, session]);

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Você precisa estar logado para adicionar um bot
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Faça login para continuar.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {formStatus === "success" && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
            role="alert"
          >
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <p>Bot adicionado com sucesso! Redirecionando...</p>
            </div>
          </div>
        )}
        {formStatus === "error" && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
            role="alert"
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Adicione seu bot à nossa lista
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="id"
              >
                ID do bot
              </label>
              <input
                required
                type="number"
                placeholder="ID do seu bot no Discord"
                id="id"
                name="id"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={handleChange}
                value={formData.id}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="description"
              >
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="invite"
              >
                Convite do bot
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Se deixado em branco, criaremos um automaticamente
              </p>
              <input
                type="text"
                placeholder="https://discord.com/oauth2/authorize?client_id=ID&permissions=0&scope=bot%20applications.commands"
                id="invite"
                name="invite"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={handleChange}
                value={formData.invite}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="longDescription"
              >
                Descrição detalhada do bot
              </label>
              <textarea
                placeholder="Descreva detalhadamente as funcionalidades do seu bot"
                minLength={250}
                maxLength={4000}
                id="longDescription"
                name="longDescription"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-32 resize-none"
                onChange={handleChange}
                value={formData.longDescription}
              ></textarea>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="website"
              >
                Website do bot
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <Link className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  id="website"
                  name="website"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="https://seubot.com"
                  onChange={handleChange}
                  value={formData.website}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="github"
              >
                GitHub do bot
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <Github className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  id="github"
                  name="github"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="https://github.com/seubot"
                  onChange={handleChange}
                  value={formData.github}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="support"
              >
                Servidor de suporte do bot
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  id="support"
                  name="support"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="https://discord.gg/seuservidor"
                  onChange={handleChange}
                  value={formData.support}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                id="sendButton"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar Bot
              </button>
            </div>
          </form>
          <input
            type="hidden"
            id="owner"
            name="owner"
            ref={ownerRef}
            value={session.session?.user?.id || ""}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
