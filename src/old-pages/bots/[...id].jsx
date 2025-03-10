"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  AlertTriangle,
  Server,
  ThumbsUp,
  Github,
  MessageCircle,
  Calendar,
  Check,
  Bot,
  Share2,
  ArrowRight,
  Heart,
} from "lucide-react";
import markdownit from "markdown-it";

export default function BotPage() {
  const [botData, setBotData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const md = useMemo(() => new markdownit({
    linkify: true,
    typographer: true,
    breaks: true,
  }), []);

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
  }, [id, md]);

  const shareBot = () => {
    if (navigator.share) {
      navigator
        .share({
          title: botData?.name || "Discord Bot",
          text: botData?.description || "Confira este bot para Discord!",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copiado para a área de transferência!"))
        .catch((err) => console.error("Erro ao copiar: ", err));
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="animate-pulse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700/50">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="h-32 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto md:mx-0"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6"></div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-4">
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-36"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-28"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-pulse mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700/50">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!botData || botData.message) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center max-w-md mx-auto border border-gray-100 dark:border-gray-700/50">
            <Bot className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Bot não encontrado
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              O bot que você está procurando não existe ou foi removido.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              Voltar para a página inicial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        {router.query.edit === "success" && (
          <div
            className="bg-green-100/90 backdrop-blur-sm border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-sm"
            role="alert"
          >
            <div className="flex items-center">
              <Check className="h-5 w-5 mr-2 text-green-500" />
              <div>
                <p className="font-bold">Sucesso!</p>
                <p>Bot editado com sucesso.</p>
              </div>
            </div>
          </div>
        )}

        {!botData.verified && (
          <div
            className="bg-yellow-100/90 backdrop-blur-sm border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-lg shadow-sm"
            role="alert"
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              <p>
                <span className="font-bold">Atenção:</span> Este bot ainda não
                foi verificado. Para sua segurança, recomenda-se aguardar a
                avaliação da nossa equipe.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg">
                  <Image
                    className="object-cover"
                    src={botData.avatar || "/placeholder.svg"}
                    width={128}
                    height={128}
                    alt={botData.name}
                  />
                </div>
                {botData.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {botData.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 mb-4">
                  {botData.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center justify-center md:justify-start bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg">
                    <ThumbsUp className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {Number(botData.votes).toLocaleString("pt-BR")} votos
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg">
                    <Server className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {Number(botData.servers).toLocaleString("pt-BR")}{" "}
                      servidores
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {new Date(botData.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Link
                    href={`/bots/${botData._id}/vote`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Votar
                  </Link>
                  <Link
                    href={`/api/bots/${botData._id}?type=invite`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm hover:shadow"
                  >
                    <Server className="mr-2 h-4 w-4" />
                    Adicionar ao Servidor
                  </Link>
                  <button
                    onClick={shareBot}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Links section */}
          {(botData.website || botData.github || botData.support) && (
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-t border-gray-100 dark:border-gray-700/50 flex flex-wrap gap-4 justify-center md:justify-start">
              {botData.website && (
                <a
                  href={botData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </a>
              )}
              {botData.github && (
                <a
                  href={botData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              )}
              {botData.support && (
                <a
                  href={botData.support}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Servidor de Suporte
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Bot className="h-6 w-6 mr-2 text-primary" />
            Sobre o Bot
          </h2>
          <div
            className="markdown-content text-gray-800 dark:text-gray-200 overflow-auto"
            dangerouslySetInnerHTML={{ __html: botData.markdownDesc }}
          />
        </div>
      </main>

      {/* Inline styles for markdown content */}
      <style jsx global>{`
        .markdown-content {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          line-height: 1.6;
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }

        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4,
        .markdown-content h5,
        .markdown-content h6 {
          margin-top: 24px;
          margin-bottom: 16px;
          font-weight: 600;
          line-height: 1.25;
          color: var(--primary, #6366f1);
        }

        .markdown-content h1 {
          font-size: 2em;
        }
        .markdown-content h2 {
          font-size: 1.5em;
        }
        .markdown-content h3 {
          font-size: 1.25em;
        }
        .markdown-content h4 {
          font-size: 1em;
        }

        .markdown-content p {
          margin-top: 0;
          margin-bottom: 16px;
        }

        .markdown-content a {
          color: var(--primary, #6366f1);
          text-decoration: none;
        }

        .markdown-content a:hover {
          text-decoration: underline;
        }

        .markdown-content img {
          max-width: 100%;
          box-sizing: content-box;
          background-color: #fff;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .markdown-content ul,
        .markdown-content ol {
          padding-left: 2em;
          margin-top: 0;
          margin-bottom: 16px;
        }

        .markdown-content ul {
          list-style-type: disc;
        }
        .markdown-content ol {
          list-style-type: decimal;
        }

        .markdown-content li {
          margin-bottom: 0.25em;
        }

        .markdown-content blockquote {
          padding: 0 1em;
          color: #6a737d;
          border-left: 0.25em solid #dfe2e5;
          margin: 0 0 16px 0;
        }

        .markdown-content pre {
          padding: 16px;
          overflow: auto;
          font-size: 85%;
          line-height: 1.45;
          background-color: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 16px;
          word-wrap: normal;
        }

        .markdown-content code {
          padding: 0.2em 0.4em;
          margin: 0;
          font-size: 85%;
          background-color: rgba(27, 31, 35, 0.05);
          border-radius: 3px;
          font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo,
            monospace;
        }

        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
          margin: 0;
          font-size: 100%;
          word-break: normal;
          white-space: pre;
          border: 0;
        }

        .markdown-content table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 16px;
          display: block;
          overflow-x: auto;
        }

        .markdown-content table th,
        .markdown-content table td {
          padding: 6px 13px;
          border: 1px solid #dfe2e5;
        }

        .markdown-content table tr {
          background-color: #fff;
          border-top: 1px solid #c6cbd1;
        }

        .markdown-content table tr:nth-child(2n) {
          background-color: #f6f8fa;
        }

        .dark .markdown-content pre,
        .dark .markdown-content code {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .dark .markdown-content table tr {
          background-color: transparent;
        }

        .dark .markdown-content table tr:nth-child(2n) {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .dark .markdown-content table th,
        .dark .markdown-content table td {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .dark .markdown-content blockquote {
          border-left-color: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
}
