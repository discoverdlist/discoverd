import { locales, defaultLocale } from "../middleware";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  pt: () => import("../dictionaries/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  return dictionaries[validLocale]();
};

export function getAlternateLanguageUrl(currentPath, currentLocale) {
  if (!currentPath) {
    return `/${currentLocale === "en" ? "pt" : "en"}`;
  }

  const pathWithoutLocale = currentPath.replace(`/${currentLocale}`, "");

  const alternateLocale = currentLocale === "en" ? "pt" : "en";

  return `/${alternateLocale}${pathWithoutLocale}`;
}
