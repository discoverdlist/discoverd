import Link from "next/link";
import {
  GitlabIcon as GitHub,
  Twitter,
  DiscIcon as Discord,
  Heart,
  ExternalLink,
  Shield,
  FileText,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { useTranslation } from "../hooks/useTranslation";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { t, lang } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={`relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-gray-900 to-gray-950 text-white"
          : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800"
      }`}
    >
      {/* Decorative dots */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)]"
            : "opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)]"
        } [background-size:20px_20px] z-0`}
      ></div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <Image
                className="h-10 w-10"
                src="/assets/logo.png"
                width={40}
                height={40}
                alt="Discoverd"
              />
              <span className="ml-2 text-xl font-bold">Discoverd</span>
            </div>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-base`}
            >
              {t("home.hero.subtitle")}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/discoverd"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDark
                    ? "text-gray-400 bg-white/5 hover:bg-white/10"
                    : "text-gray-600 bg-black/5 hover:bg-black/10"
                } hover:text-primary transition-colors p-2 rounded-full`}
                aria-label="GitHub"
              >
                <GitHub className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/discoverdapp"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDark
                    ? "text-gray-400 bg-white/5 hover:bg-white/10"
                    : "text-gray-600 bg-black/5 hover:bg-black/10"
                } hover:text-primary transition-colors p-2 rounded-full`}
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/discoverd"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDark
                    ? "text-gray-400 bg-white/5 hover:bg-white/10"
                    : "text-gray-600 bg-black/5 hover:bg-black/10"
                } hover:text-primary transition-colors p-2 rounded-full`}
                aria-label="Discord"
              >
                <Discord className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-gray-800"
              } tracking-wider uppercase mb-4`}
            >
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}`}
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } hover:text-primary transition-colors flex items-center`}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {t("common.home")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/explore`}
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } hover:text-primary transition-colors flex items-center`}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {t("common.explore")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/partners`}
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } hover:text-primary transition-colors flex items-center`}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {t("common.partners")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/bots/add`}
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } hover:text-primary transition-colors flex items-center`}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {t("common.addBot")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-gray-800"
              } tracking-wider uppercase mb-4`}
            >
              {t("footer.support")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}/faq`}
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } hover:text-primary transition-colors flex items-center`}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } hover:text-primary transition-colors flex items-center`}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>

            <h3
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-gray-800"
              } tracking-wider uppercase mt-6 mb-4`}
            >
              {t("footer.legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}/terms`}
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } hover:text-primary transition-colors flex items-center`}
                >
                  <FileText className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/privacy`}
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } hover:text-primary transition-colors flex items-center`}
                >
                  <Lock className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/bot-requirements`}
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } hover:text-primary transition-colors flex items-center`}
                >
                  <Shield className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {t("botRequirements.title")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-gray-800"
              } tracking-wider uppercase mb-4`}
            >
              {t("footer.subscribe")}
            </h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>
              {t("footer.subscribeText")}
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={t("footer.yourEmail")}
                className={`px-4 py-2 ${
                  isDark
                    ? "bg-white/5 border-gray-800 text-white"
                    : "bg-black/5 border-gray-300 text-gray-800"
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50`}
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
              >
                {t("footer.subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div
          className={`mt-12 pt-8 ${
            isDark ? "border-gray-800" : "border-gray-300"
          } border-t`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-sm`}
            >
              &copy; {new Date().getFullYear()} Discoverd.{" "}
              {t("common.allRightsReserved")}
            </p>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-sm flex items-center mt-4 md:mt-0`}
            >
              {t("common.madeWith")}{" "}
              <Heart className="h-4 w-4 text-red-500 mx-1" />{" "}
              {t("common.inBrazil")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
