"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary, getAlternateLanguageUrl } from "../lib/i18n";

export function useTranslation() {
  const params = useParams();
  const pathname = usePathname();
  const [translations, setTranslations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const lang = params?.lang || "pt";

  useEffect(() => {
    async function loadTranslations() {
      setIsLoading(true);
      const dict = await getDictionary(lang);
      setTranslations(dict);
      setIsLoading(false);
    }

    loadTranslations();
  }, [lang]);

  const t = (keyPath, replacements = {}) => {
    if (!translations) return "";

    const keys = keyPath.split(".");

    let value = translations;
    for (const key of keys) {
      value = value[key];
      if (value === undefined) return keyPath;
    }

    if (typeof value === "string") {
      return Object.entries(replacements).reduce((acc, [key, val]) => {
        return acc.replace(new RegExp(`{${key}}`, "g"), val);
      }, value);
    }

    return value || keyPath;
  };

  const alternateLanguageUrl = getAlternateLanguageUrl(pathname, lang);

  return {
    t,
    lang,
    isLoading,
    alternateLanguageUrl,
  };
}
