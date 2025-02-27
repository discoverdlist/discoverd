import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function EditBot() {
  const { data: session } = useSession();
  const [botId, setBotId] = useState(null);

  const [botData, setBotData] = useState({});
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

  console.log(botId)

  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.location.pathname.split("/")[3];
      setBotId(id);
    }
  }, []);

  useEffect(() => {
    if (!botId || !session) return;

    const fetchBot = async () => {
      try {
        const response = await fetch(`/api/bots/${botId}?apiKey=true`);
        const data = await response.json();

        if (data.owner !== session.session.user.id) {
          window.location.href = "/";
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
        setError("Erro ao carregar dados do bot. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBot();
  }, [botId, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        window.location.href = `/bots/${botId}?edit=success`;
      } else {
        const data = await response.json();
        setError(data.message || "Erro ao editar bot. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro inesperado", error);
      setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Você precisa estar logado para editar um bot
            </h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
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
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
            role="alert"
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            API Key
          </h2>
          <div className="flex items-center space-x-4">
            <p
              className={`text-gray-700 dark:text-gray-300 ${
                showApiKey ? "" : "filter blur-sm"
              }`}
            >
              {botData.apiKey}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOff className="mr-2" />
              ) : (
                <Eye className="mr-2" />
              )}
              {showApiKey ? "Ocultar Chave" : "Mostrar Chave"}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Editar Bot
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="id"
              >
                ID do bot
              </label>
              <input
                type="number"
                id="id"
                name="id"
                value={formData.id}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100 dark:bg-gray-700"
                disabled
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
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                minLength={50}
                maxLength={250}
                required
                placeholder="Breve descrição do seu bot"
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
                id="invite"
                name="invite"
                value={formData.invite}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="https://discord.com/oauth2/authorize?client_id=ID&permissions=0&scope=bot%20applications.commands"
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
                id="longDescription"
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-32"
                minLength={250}
                maxLength={4000}
                required
                placeholder="Descreva detalhadamente as funcionalidades do seu bot"
              ></textarea>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="website"
              >
                Website do bot
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="https://seubot.com"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="github"
              >
                GitHub do bot
              </label>
              <input
                type="text"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="https://github.com/seubot"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="support"
              >
                Servidor de suporte do bot
              </label>
              <input
                type="text"
                id="support"
                name="support"
                value={formData.support}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="https://discord.gg/seuservidor"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar Edições"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
