"use client";

import { useTranslation } from "../../hooks/useTranslation";
import { ExternalLink, FileText, Shield } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  const { t, lang } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50 mb-8">
            <div className="bg-primary/10 dark:bg-primary/20 p-6 border-b border-gray-100 dark:border-gray-700/50">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <FileText className="h-7 w-7 mr-3 text-primary" />
                {t("terms.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t("terms.lastUpdated", { date: "2023-11-01" })}
              </p>
            </div>

            <div className="p-6 prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.introduction")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("terms.sections.acceptance.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.sections.acceptance.content")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("terms.sections.eligibility.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.sections.eligibility.content")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("terms.sections.accounts.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.sections.accounts.content")}
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("terms.sections.accounts.list.item1")}</li>
                <li>{t("terms.sections.accounts.list.item2")}</li>
                <li>{t("terms.sections.accounts.list.item3")}</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("terms.sections.conduct.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.sections.conduct.content")}
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("terms.sections.conduct.list.item1")}</li>
                <li>{t("terms.sections.conduct.list.item2")}</li>
                <li>{t("terms.sections.conduct.list.item3")}</li>
                <li>{t("terms.sections.conduct.list.item4")}</li>
                <li>{t("terms.sections.conduct.list.item5")}</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("terms.sections.intellectual.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.sections.intellectual.content")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("terms.sections.liability.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.sections.liability.content")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("terms.sections.modifications.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.sections.modifications.content")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("terms.sections.termination.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.sections.termination.content")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("terms.sections.contact.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("terms.sections.contact.content")}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/bot-requirements`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              <Shield className="mr-2 h-4 w-4" />
              {t("terms.botRequirementsLink")}
            </Link>
            <Link
              href={`/${lang}/privacy`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {t("terms.privacyPolicyLink")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
