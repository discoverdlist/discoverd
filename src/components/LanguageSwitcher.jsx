"use client";

import { useTranslation } from "../hooks/useTranslation";
import Link from "next/link";
import Image from "next/image";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, alternateLanguageUrl } = useTranslation();

  return (
    <Link
      href={alternateLanguageUrl}
      className={`flex items-center gap-2 text-sm font-medium transition-colors ${className}`}
      aria-label={`Switch to ${lang === "en" ? "Portuguese" : "English"}`}
    >
      <div className="relative w-5 h-3.5 rounded-sm overflow-hidden">
        <Image
          src={`/assets/flags/${lang === "en" ? "br" : "us"}.svg`}
          alt={lang === "en" ? "Bandeira do Brasil" : "United States Flag"}
          fill
          className="object-cover"
          sizes="20px"
        />
      </div>
      <span>{lang === "en" ? "PT" : "EN"}</span>
    </Link>
  );
}
