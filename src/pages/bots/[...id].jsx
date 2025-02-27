"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FlameIcon as Fire,
  Clock,
  BarChart2,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import markdownit from "markdown-it";

export default function BotPage() {
  const [botData, setBotData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const md = new markdownit();

  useEffect(() => {
    if (!id) return;

    const fetchBot = async () => {
      try {
        const response = await fetch(`/api/bots/${id}`);
        const data = await response.json();
        if (data.longDescription) {
          data.markdownDesc = md.render(data.longDescription);
        }
        setBotData(data);
      } catch (error) {
        console.error("Error fetching bot:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBot();
  }, [id, md.render]); // Added md.render to dependencies

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-full w-32 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!botData || botData.message) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Bot não encontrado
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Verifique o ID e tente novamente
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
        {router.query.edit === "success" && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
            role="alert"
          >
            <p className="font-bold">Sucesso!</p>
            <p>Bot editado com sucesso.</p>
          </div>
        )}

        {!botData.verified && (
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
            role="alert"
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p>
                <span className="font-bold">Atenção:</span> Este bot ainda não
                foi verificado. Para sua segurança, recomenda-se aguardar a
                avaliação da nossa equipe.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Image
                className="rounded-full"
                src={botData.avatar || "/placeholder.svg"}
                width={128}
                height={128}
                alt={botData.name}
              />
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {botData.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                  {botData.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Fire className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  {Number(botData.votes).toLocaleString("pt-BR")} votos
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  Adicionado em{" "}
                  {new Date(botData.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="flex items-center">
                <BarChart2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  {Number(botData.servers).toLocaleString("pt-BR")} servidores
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/bots/${botData._id}/vote`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Votar
              </Link>
              <Link
                href={`/api/bots/${botData._id}?type=invite`}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Adicionar ao Servidor
              </Link>
              {botData.website && (
                <a
                  href={botData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
                >
                  Website <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Descrição do Bot
          </h2>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: botData.markdownDesc }}
          ></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
