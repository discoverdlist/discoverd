"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,
  PlusCircle,
  Home,
  Compass,
  Users,
  DiscIcon as Discord,
  Moon,
  Sun,
} from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { data: auth } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Adicione este useEffect logo após as declarações de estado
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) setIsDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md"
          : "bg-white/50 dark:bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="flex-shrink-0 flex items-center">
              <Image
                className="h-9 w-9 rounded-full"
                src="/assets/logo.png"
                width={36}
                height={36}
                alt="Logo da Discoverd"
              />
              <span
                className={`ml-2 font-bold text-lg ${
                  scrolled
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-white"
                }`}
              >
                Discoverd
              </span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                <Link
                  href={`/${lang}`}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                    scrolled
                      ? "text-gray-700 hover:bg-primary/10 hover:text-primary dark:text-gray-200 dark:hover:bg-primary/20 dark:hover:text-primary"
                      : "text-gray-800 dark:text-white/90 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {isMounted ? (
                    <Home className="w-4 h-4 mr-1.5" />
                  ) : (
                    <span className="w-4 h-4 mr-1.5" />
                  )}
                  {t("common.home")}
                </Link>
                <Link
                  href={`/${lang}/explore`}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                    scrolled
                      ? "text-gray-700 hover:bg-primary/10 hover:text-primary dark:text-gray-200 dark:hover:bg-primary/20 dark:hover:text-primary"
                      : "text-gray-800 dark:text-white/90 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {isMounted ? (
                    <Compass className="w-4 h-4 mr-1.5" />
                  ) : (
                    <span className="w-4 h-4 mr-1.5" />
                  )}
                  {t("common.explore")}
                </Link>
                <Link
                  href={`/${lang}/partners`}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                    scrolled
                      ? "text-gray-700 hover:bg-primary/10 hover:text-primary dark:text-gray-200 dark:hover:bg-primary/20 dark:hover:text-primary"
                      : "text-gray-800 dark:text-white/90 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {isMounted ? (
                    <Users className="w-4 h-4 mr-1.5" />
                  ) : (
                    <span className="w-4 h-4 mr-1.5" />
                  )}
                  {t("common.partners")}
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  : "text-gray-700 dark:text-white/90 hover:bg-gray-200/50 dark:hover:bg-white/10"
              }`}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <LanguageSwitcher
              className={
                scrolled
                  ? "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
                  : "text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white"
              }
            />
            <div className="ml-4 flex items-center md:ml-6">
              {auth ? (
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={toggleDropdown}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                      scrolled
                        ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <Image
                      className="h-7 w-7 rounded-full ring-2 ring-primary/30"
                      src={auth.session.user.image || "/placeholder.svg"}
                      width={28}
                      height={28}
                      alt={auth.session.user.name}
                    />
                    <span
                      className={`text-sm font-medium ${
                        scrolled
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-800 dark:text-white"
                      }`}
                    >
                      {auth.session.user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      } ${
                        scrolled
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-500 dark:text-white/70"
                      }`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 focus:outline-none divide-y divide-gray-100 dark:divide-gray-700">
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("common.connectedAs")}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {auth.session.user.name}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href={`/${lang}/profile`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        >
                          {isMounted ? (
                            <User className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                          ) : (
                            <span className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                          )}{" "}
                          {t("common.profile")}
                        </Link>
                        <Link
                          href={`/${lang}/settings`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        >
                          {isMounted ? (
                            <Settings className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                          ) : (
                            <span className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                          )}{" "}
                          {t("common.settings")}
                        </Link>
                        <Link
                          href={`/${lang}/bots/add`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        >
                          {isMounted ? (
                            <PlusCircle className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                          ) : (
                            <span className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                          )}{" "}
                          {t("common.addBot")}
                        </Link>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => signOut()}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        >
                          {isMounted ? (
                            <LogOut className="mr-3 h-4 w-4" />
                          ) : (
                            <span className="mr-3 h-4 w-4" />
                          )}{" "}
                          {t("common.logout")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => signIn("discord")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
                >
                  {isMounted ? (
                    <Discord className="mr-2 h-4 w-4" />
                  ) : (
                    <span className="mr-2 h-4 w-4" />
                  )}
                  {t("common.loginWithDiscord")}
                </button>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors mr-2 ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  : "text-gray-700 dark:text-white/90 hover:bg-gray-200/50 dark:hover:bg-white/10"
              }`}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled
                  ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                  : "text-gray-600 dark:text-white/70 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10"
              }`}
            >
              <span className="sr-only">{t("nav.mainMenu")}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={`/${lang}`}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMounted ? (
                <Home className="mr-3 h-5 w-5 text-primary" />
              ) : (
                <span className="mr-3 h-5 w-5 text-primary" />
              )}
              {t("common.home")}
            </Link>
            <Link
              href={`/${lang}/explore`}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMounted ? (
                <Compass className="mr-3 h-5 w-5 text-primary" />
              ) : (
                <span className="mr-3 h-5 w-5 text-primary" />
              )}
              {t("common.explore")}
            </Link>
            <Link
              href={`/${lang}/partners`}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMounted ? (
                <Users className="mr-3 h-5 w-5 text-primary" />
              ) : (
                <span className="mr-3 h-5 w-5 text-primary" />
              )}
              {t("common.partners")}
            </Link>
            <div className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white">
              <LanguageSwitcher className="text-gray-900 dark:text-white" />
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {auth ? (
              <>
                <div className="flex items-center px-5 py-3">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full ring-2 ring-primary/30"
                      src={auth.session.user.image || "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={auth.session.user.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-900 dark:text-white">
                      {auth.session.user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {auth.session.user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    href={`/${lang}/profile`}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isMounted ? (
                      <User className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    ) : (
                      <span className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    )}
                    {t("common.profile")}
                  </Link>
                  <Link
                    href={`/${lang}/settings`}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isMounted ? (
                      <Settings className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    ) : (
                      <span className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    )}
                    {t("common.settings")}
                  </Link>
                  <Link
                    href={`/${lang}/bots/add`}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isMounted ? (
                      <PlusCircle className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    ) : (
                      <span className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    )}
                    {t("common.addBot")}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isMounted ? (
                      <LogOut className="mr-3 h-5 w-5" />
                    ) : (
                      <span className="mr-3 h-5 w-5" />
                    )}
                    {t("common.logout")}
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={() => signIn("discord")}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90"
                >
                  {isMounted ? (
                    <Discord className="mr-3 h-5 w-5" />
                  ) : (
                    <span className="mr-3 h-5 w-5" />
                  )}
                  {t("common.loginWithDiscord")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
