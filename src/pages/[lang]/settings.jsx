"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Save,
  User,
  Moon,
  Sun,
  Monitor,
  Globe,
  AlertTriangle,
  Check,
} from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import Image from "next/image";

export default function SettingsPage() {
  const router = useRouter();
  const { lang } = router.query;
  const { t } = useTranslation();
  const { data: session, status } = useSession();

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState(lang || "en");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [sessionError, setSessionError] = useState(false);

  // Load user data and preferences
  useEffect(() => {
    setIsMounted(true);

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);

    // Apply theme
    if (
      savedTheme === "dark" ||
      (savedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Fetch user data when session is available
  useEffect(() => {
    if (status === "authenticated" && session) {
      // Determine the correct path to the user ID based on session structure
      let userId;
      try {
        // Try different possible paths to find the user ID
        if (session.user?.id) {
          userId = session.user.id;
        } else if (session.session?.user?.id) {
          userId = session.session.user.id;
        } else {
          // Log the session structure to help debug
          console.log("Session structure:", JSON.stringify(session, null, 2));
          setSessionError(true);
          setIsLoading(false);
          return;
        }

        fetchUserData(userId);
      } catch (error) {
        console.error("Error accessing user ID:", error);
        setSessionError(true);
        setIsLoading(false);
      }
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    } else if (status === "loading") {
      // Keep loading state
    } else {
      // Fallback to ensure we don't get stuck in loading
      setIsLoading(false);
    }
  }, [status, session]);

  // Safety timeout to ensure the page doesn't get stuck in loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.warn(
          "Loading timeout reached, forcing loading state to complete"
        );
        setIsLoading(false);
      }
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  // Debug function to log session data
  const logSessionData = () => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  };

  const fetchUserData = async (userId) => {
    try {
      setIsLoading(true);
      console.log("Fetching user data for ID:", userId);

      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();

      if (res.ok) {
        console.log("User data fetched successfully:", data);
        setUserData(data);
        setDescription(data.description || "");
      } else {
        console.error("Error fetching user data:", data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (
      newTheme === "dark" ||
      (newTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    router.push(`/${newLang}/settings`, undefined, { locale: newLang });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();

    // Get the user ID from the session using the same logic as above
    let userId;
    try {
      if (session.user?.id) {
        userId = session.user.id;
      } else if (session.session?.user?.id) {
        userId = session.session.user.id;
      } else {
        throw new Error("Could not determine user ID");
      }
    } catch (error) {
      console.error("Error accessing user ID:", error);
      setSaveStatus({
        type: "error",
        message: "Could not determine user ID. Please try logging in again.",
      });
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus(null);

      const res = await fetch("/api/users/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify({
          userId: userId,
          description: description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSaveStatus({
          type: "success",
          message: data.message || t("settings.settingsSaved"),
        });

        // Update local user data
        setUserData({
          ...userData,
          description: description,
        });
      } else {
        setSaveStatus({
          type: "error",
          message: data.message || t("errors.unexpectedError"),
        });
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveStatus({
        type: "error",
        message: t("errors.unexpectedError"),
      });
    } finally {
      setIsSaving(false);

      // Clear success message after 3 seconds
      if (saveStatus?.type === "success") {
        setTimeout(() => {
          setSaveStatus(null);
        }, 3000);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <div className="max-w-3xl mx-auto mt-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <div className="max-w-3xl mx-auto mt-8">
            <Link
              href={`/${lang || "en"}`}
              className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors mb-6"
            >
              {isMounted ? (
                <ArrowLeft className="h-4 w-4 mr-1" />
              ) : (
                <span className="h-4 w-4 mr-1" />
              )}
              {t("common.back")}
            </Link>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4 text-amber-500 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <h2 className="text-lg font-semibold">
                  {t("settings.loginRequired")}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t("settings.loginRequiredDesc")}
              </p>
              <Link
                href={`/api/auth/signin?callbackUrl=${encodeURIComponent(
                  `/${lang || "en"}/settings`
                )}`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {t("common.loginWithDiscord")}
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (sessionError) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <div className="max-w-3xl mx-auto mt-8">
            <Link
              href={`/${lang || "en"}`}
              className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors mb-6"
            >
              {isMounted ? (
                <ArrowLeft className="h-4 w-4 mr-1" />
              ) : (
                <span className="h-4 w-4 mr-1" />
              )}
              {t("common.back")}
            </Link>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4 text-red-500 dark:text-red-400">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <h2 className="text-lg font-semibold">Session Error</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                There was an error accessing your session data. Please try
                logging out and logging back in.
              </p>
              <div className="flex space-x-4">
                <Link
                  href={`/api/auth/signout?callbackUrl=${encodeURIComponent(
                    `/${lang || "en"}`
                  )}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Logout
                </Link>
                <button
                  onClick={logSessionData}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Debug Session
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${lang || "en"}/profile`}
            className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors mb-6"
          >
            {isMounted ? (
              <ArrowLeft className="h-4 w-4 mr-1" />
            ) : (
              <span className="h-4 w-4 mr-1" />
            )}
            {t("common.back")}
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t("settings.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t("settings.subtitle")}
          </p>

          <form onSubmit={handleSaveSettings}>
            {/* Profile Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  {t("profile.userInfo")}
                </h2>

                {userData && (
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                      <Image
                        src={
                          userData.avatar ||
                          "/placeholder.svg?height=64&width=64"
                        }
                        alt={userData.username}
                        className="w-full h-full object-cover"
                        width={4096}
                        height={4096}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {userData.username}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("profile.memberSince")}{" "}
                        {new Date(userData.createdAt).toLocaleDateString(
                          lang === "en" ? "en-US" : "pt-BR"
                        )}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t("profile.description") || "Description"}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder={
                      t("profile.descriptionPlaceholder") ||
                      "Tell us about yourself..."
                    }
                    maxLength={500}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {description.length}/500
                  </p>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("settings.appearance")}
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("settings.theme")}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => handleThemeChange("light")}
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                        theme === "light"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <Sun className="w-6 h-6 mb-1" />
                      <span className="text-sm">{t("settings.light")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleThemeChange("dark")}
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                        theme === "dark"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <Moon className="w-6 h-6 mb-1" />
                      <span className="text-sm">{t("settings.dark")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleThemeChange("system")}
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                        theme === "system"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <Monitor className="w-6 h-6 mb-1" />
                      <span className="text-sm">{t("settings.system")}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("settings.language")}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleLanguageChange("en")}
                      className={`flex items-center justify-center p-3 border rounded-lg ${
                        language === "en"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      <span>English</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLanguageChange("pt")}
                      className={`flex items-center justify-center p-3 border rounded-lg ${
                        language === "pt"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      <span>Português</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button and Status */}
            {saveStatus && (
              <div
                className={`mb-4 p-4 rounded-lg ${
                  saveStatus.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-800 dark:text-green-300"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-800 dark:text-red-300"
                }`}
              >
                <div className="flex items-center">
                  {saveStatus.type === "success" ? (
                    <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                  )}
                  <p>{saveStatus.message}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSaving
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                }`}
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
                    {t("settings.saving")}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t("settings.saveSettings")}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
