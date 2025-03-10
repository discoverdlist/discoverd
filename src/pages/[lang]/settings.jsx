"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "../../hooks/useTranslation";
import { useTheme } from "../../components/ThemeProvider";
import {
  SettingsIcon,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  DiscIcon as Discord,
  Save,
  Trash2,
} from "lucide-react";

export default function Settings() {
  const { data: session } = useSession();
  const { t, lang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center max-w-md mx-auto border border-gray-100 dark:border-gray-700/50">
            <SettingsIcon className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("settings.loginRequired")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("settings.loginRequiredDesc")}
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
          {saveSuccess && (
            <div
              className="bg-green-100/90 backdrop-blur-sm border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-sm"
              role="alert"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                <p>{t("settings.settingsSaved")}</p>
              </div>
            </div>
          )}

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 overflow-hidden mb-8">
            <div className="bg-primary/10 dark:bg-primary/20 p-6 border-b border-gray-100 dark:border-gray-700/50">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <SettingsIcon className="h-6 w-6 mr-2 text-primary" />
                {t("settings.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t("settings.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 space-y-8">
              {/* General Settings */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  {t("settings.generalSettings")}
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                      {t("settings.appearance")}
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t("settings.theme")}
                        </label>
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => setTheme("light")}
                            className={`inline-flex items-center px-4 py-2 border ${
                              theme === "light"
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                            } text-sm font-medium rounded-lg transition-colors`}
                          >
                            <Sun className="mr-2 h-4 w-4" />
                            {t("settings.light")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setTheme("dark")}
                            className={`inline-flex items-center px-4 py-2 border ${
                              theme === "dark"
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                            } text-sm font-medium rounded-lg transition-colors`}
                          >
                            <Moon className="mr-2 h-4 w-4" />
                            {t("settings.dark")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setTheme("system")}
                            className={`inline-flex items-center px-4 py-2 border ${
                              theme === "system"
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                            } text-sm font-medium rounded-lg transition-colors`}
                          >
                            <Monitor className="mr-2 h-4 w-4" />
                            {t("settings.system")}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t("settings.language")}
                        </label>
                        <div className="flex flex-wrap gap-3">
                          <Link
                            href="/pt/settings"
                            className={`inline-flex items-center px-4 py-2 border ${
                              lang === "pt"
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                            } text-sm font-medium rounded-lg transition-colors`}
                          >
                            Português
                          </Link>
                          <Link
                            href="/en/settings"
                            className={`inline-flex items-center px-4 py-2 border ${
                              lang === "en"
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                            } text-sm font-medium rounded-lg transition-colors`}
                          >
                            English
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                      {t("settings.notifications")}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          {t("settings.emailNotifications")}
                        </label>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                          <input
                            type="checkbox"
                            id="emailNotifications"
                            className="opacity-0 w-0 h-0"
                            checked={emailNotifications}
                            onChange={() =>
                              setEmailNotifications(!emailNotifications)
                            }
                          />
                          <label
                            htmlFor="emailNotifications"
                            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-200 ${
                              emailNotifications
                                ? "bg-primary"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          >
                            <span
                              className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-200 ${
                                emailNotifications
                                  ? "transform translate-x-6"
                                  : ""
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          {t("settings.marketingEmails")}
                        </label>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                          <input
                            type="checkbox"
                            id="marketingEmails"
                            className="opacity-0 w-0 h-0"
                            checked={marketingEmails}
                            onChange={() =>
                              setMarketingEmails(!marketingEmails)
                            }
                          />
                          <label
                            htmlFor="marketingEmails"
                            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-200 ${
                              marketingEmails
                                ? "bg-primary"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          >
                            <span
                              className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-200 ${
                                marketingEmails ? "transform translate-x-6" : ""
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  {t("settings.securitySettings")}
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">
                          {t("settings.twoFactorAuth")}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {twoFactorAuth
                            ? t("settings.disable")
                            : t("settings.enable")}{" "}
                          {t("settings.twoFactorAuth").toLowerCase()}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                        className={`px-4 py-2 border text-sm font-medium rounded-lg ${
                          twoFactorAuth
                            ? "border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                            : "border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                        } transition-colors`}
                      >
                        {twoFactorAuth
                          ? t("settings.disable")
                          : t("settings.enable")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div>
                <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {t("settings.dangerZone")}
                </h2>

                <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-800/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-md font-medium text-red-700 dark:text-red-400">
                        {t("settings.deleteAccount")}
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-300">
                        {t("settings.deleteAccountDesc")}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors md:self-start"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {t("settings.deleteAccount")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full md:w-auto flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
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
                      {t("common.saving")}...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      {t("settings.saveSettings")}
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
