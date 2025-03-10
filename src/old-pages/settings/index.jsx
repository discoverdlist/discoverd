"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  Save,
  User,
  Bell,
  Shield,
  Key,
  LogOut,
  Lock,
  Moon,
  Sun,
  Monitor,
  Plus,
} from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    botVotes: true,
    botAdditions: false,
    partnerOffers: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    // Simulate API call
    setTimeout(() => {
      setSuccessMessage("Configurações salvas com sucesso!");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // In a real implementation, you would update the theme in localStorage and apply it
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // System theme would check media query
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center max-w-md mx-auto border border-gray-100 dark:border-gray-700/50">
            <Lock className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Você precisa estar logado para acessar as configurações
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Faça login com sua conta Discord para gerenciar suas
              configurações.
            </p>
            <button
              onClick={() => signIn("discord")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Configurações da Conta
        </h1>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-64 bg-gray-50 dark:bg-gray-900/50 p-4 md:border-r border-gray-100 dark:border-gray-700/50">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "profile"
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Perfil
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "notifications"
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Bell className="w-5 h-5 mr-3" />
                  Notificações
                </button>
                <button
                  onClick={() => setActiveTab("appearance")}
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "appearance"
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Monitor className="w-5 h-5 mr-3" />
                  Aparência
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "security"
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  Segurança
                </button>
                <button
                  onClick={() => setActiveTab("apikeys")}
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "apikeys"
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Key className="w-5 h-5 mr-3" />
                  API Keys
                </button>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => signOut()}
                  className="flex items-center px-4 py-2 rounded-lg text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sair
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {successMessage && (
                <div
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md"
                  role="alert"
                >
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p>{successMessage}</p>
                  </div>
                </div>
              )}

              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Informações do Perfil
                  </h2>

                  <div className="mb-6 flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center">
                      <div className="relative group">
                        <Image
                          src={session.session.user.image || "/placeholder.svg"}
                          alt={session.session.user.name}
                          width={128}
                          height={128}
                          className="rounded-full border-4 border-white dark:border-gray-800 object-cover bg-white dark:bg-gray-700"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                          <span className="text-white text-sm font-medium">
                            Mudar avatar
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Imagem sincronizada com o Discord
                      </p>
                    </div>

                    <div className="flex-1 w-full">
                      <form onSubmit={handleSaveSettings}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Nome de Usuário
                            </label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              className="block w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                              defaultValue={session.session.user.name}
                              readOnly
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Sincronizado com seu perfil do Discord
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              E-mail
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="block w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                              defaultValue={session.session.user.email}
                              readOnly
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Sincronizado com seu perfil do Discord
                            </p>
                          </div>
                        </div>

                        <div className="mt-6">
                          <label
                            htmlFor="bio"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Biografia
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows="4"
                            className="block w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                            placeholder="Fale um pouco sobre você..."
                          ></textarea>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Salvando...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Salvar Alterações
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Preferências de Notificações
                  </h2>

                  <form onSubmit={handleSaveSettings}>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="emailUpdates"
                            name="emailUpdates"
                            type="checkbox"
                            checked={notifications.emailUpdates}
                            onChange={() =>
                              setNotifications({
                                ...notifications,
                                emailUpdates: !notifications.emailUpdates,
                              })
                            }
                            className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="emailUpdates"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            Atualizações por e-mail
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Receber atualizações sobre a plataforma, novos
                            recursos e melhorias.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="botVotes"
                            name="botVotes"
                            type="checkbox"
                            checked={notifications.botVotes}
                            onChange={() =>
                              setNotifications({
                                ...notifications,
                                botVotes: !notifications.botVotes,
                              })
                            }
                            className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="botVotes"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            Votos nos seus bots
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Ser notificado quando alguém votar em um de seus
                            bots.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="botAdditions"
                            name="botAdditions"
                            type="checkbox"
                            checked={notifications.botAdditions}
                            onChange={() =>
                              setNotifications({
                                ...notifications,
                                botAdditions: !notifications.botAdditions,
                              })
                            }
                            className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="botAdditions"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            Novos bots
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Receber notificações sobre novos bots adicionados à
                            plataforma.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="partnerOffers"
                            name="partnerOffers"
                            type="checkbox"
                            checked={notifications.partnerOffers}
                            onChange={() =>
                              setNotifications({
                                ...notifications,
                                partnerOffers: !notifications.partnerOffers,
                              })
                            }
                            className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="partnerOffers"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            Ofertas e promoções
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Receber ofertas especiais e promoções de nossos
                            parceiros.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Salvar Preferências
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "appearance" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Aparência
                  </h2>

                  <form onSubmit={handleSaveSettings}>
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tema
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div
                          className={`flex flex-col items-center p-4 border ${
                            theme === "light"
                              ? "border-primary ring-2 ring-primary/50"
                              : "border-gray-200 dark:border-gray-700"
                          } rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50`}
                          onClick={() => handleThemeChange("light")}
                        >
                          <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center mb-2">
                            <Sun className="h-6 w-6 text-amber-500" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Claro
                          </span>
                        </div>

                        <div
                          className={`flex flex-col items-center p-4 border ${
                            theme === "dark"
                              ? "border-primary ring-2 ring-primary/50"
                              : "border-gray-200 dark:border-gray-700"
                          } rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50`}
                          onClick={() => handleThemeChange("dark")}
                        >
                          <div className="w-12 h-12 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center mb-2">
                            <Moon className="h-6 w-6 text-gray-100" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Escuro
                          </span>
                        </div>

                        <div
                          className={`flex flex-col items-center p-4 border ${
                            theme === "system"
                              ? "border-primary ring-2 ring-primary/50"
                              : "border-gray-200 dark:border-gray-700"
                          } rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50`}
                          onClick={() => handleThemeChange("system")}
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-white to-gray-900 rounded-full border border-gray-300 flex items-center justify-center mb-2">
                            <Monitor className="h-6 w-6 text-gray-700" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Sistema
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Salvar Preferências
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Segurança
                  </h2>

                  <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">
                          Sua conta está atualmente vinculada ao Discord. As
                          configurações de segurança são gerenciadas através do
                          seu perfil do Discord.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">
                            Autenticação em duas etapas
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Adicione uma camada extra de proteção à sua conta
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            Gerenciado pelo Discord
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                        Sessões ativas
                      </h3>

                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex items-center">
                          <div className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Dispositivo
                          </div>
                          <div className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Local
                          </div>
                          <div className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Última atividade
                          </div>
                          <div className="w-20"></div>
                        </div>

                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          <div className="px-4 py-3 flex items-center">
                            <div className="flex-1 flex items-center">
                              <svg
                                className="h-5 w-5 text-gray-400 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Windows • Chrome
                              </span>
                            </div>
                            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                              São Paulo, Brasil
                            </div>
                            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                              Agora
                            </div>
                            <div className="w-20 text-right">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                                Atual
                              </span>
                            </div>
                          </div>

                          <div className="px-4 py-3 flex items-center">
                            <div className="flex-1 flex items-center">
                              <svg
                                className="h-5 w-5 text-gray-400 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Android • App
                              </span>
                            </div>
                            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                              São Paulo, Brasil
                            </div>
                            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                              Há 2 dias
                            </div>
                            <div className="w-20 text-right">
                              <button className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                                Encerrar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "apikeys" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    API Keys
                  </h2>

                  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">
                          As API Keys dão acesso à nossa API. Mantenha-as
                          seguras e nunca compartilhe com terceiros.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Suas API Keys
                    </h3>

                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                            Bot Dashboard
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Criada em 15 de junho de 2023
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 mr-2">
                            Ativa
                          </span>
                          <button className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                            Revogar
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                            Website Integration
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Criada em 3 de maio de 2023
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 mr-2">
                            Ativa
                          </span>
                          <button className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                            Revogar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Criar nova API Key
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
