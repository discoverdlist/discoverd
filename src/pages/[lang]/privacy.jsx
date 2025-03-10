"use client";

import { useTranslation } from "../../hooks/useTranslation";
import { Lock, FileText, Shield } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const { t, lang } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50 mb-8">
            <div className="bg-primary/10 dark:bg-primary/20 p-6 border-b border-gray-100 dark:border-gray-700/50">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <Lock className="h-7 w-7 mr-3 text-primary" />
                {t("privacy.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t("privacy.lastUpdated", { date: "2023-11-01" })}
              </p>
            </div>

            <div className="p-6 prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacy.introduction")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("privacy.sections.information.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacy.sections.information.content")}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                {t("privacy.sections.information.subsections.personal.title")}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  {t(
                    "privacy.sections.information.subsections.personal.list.item1"
                  )}
                </li>
                <li>
                  {t(
                    "privacy.sections.information.subsections.personal.list.item2"
                  )}
                </li>
                <li>
                  {t(
                    "privacy.sections.information.subsections.personal.list.item3"
                  )}
                </li>
                <li>
                  {t(
                    "privacy.sections.information.subsections.personal.list.item4"
                  )}
                </li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                {t("privacy.sections.information.subsections.usage.title")}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  {t(
                    "privacy.sections.information.subsections.usage.list.item1"
                  )}
                </li>
                <li>
                  {t(
                    "privacy.sections.information.subsections.usage.list.item2"
                  )}
                </li>
                <li>
                  {t(
                    "privacy.sections.information.subsections.usage.list.item3"
                  )}
                </li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("privacy.sections.usage.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacy.sections.usage.content")}
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("privacy.sections.usage.list.item1")}</li>
                <li>{t("privacy.sections.usage.list.item2")}</li>
                <li>{t("privacy.sections.usage.list.item3")}</li>
                <li>{t("privacy.sections.usage.list.item4")}</li>
                <li>{t("privacy.sections.usage.list.item5")}</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("privacy.sections.sharing.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacy.sections.sharing.content")}
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("privacy.sections.sharing.list.item1")}</li>
                <li>{t("privacy.sections.sharing.list.item2")}</li>
                <li>{t("privacy.sections.sharing.list.item3")}</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("privacy.sections.security.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacy.sections.security.content")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("privacy.sections.cookies.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacy.sections.cookies.content")}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                {t("privacy.sections.cookies.subsections.types.title")}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <strong>
                    {t(
                      "privacy.sections.cookies.subsections.types.list.essential.title"
                    )}
                    :
                  </strong>{" "}
                  {t(
                    "privacy.sections.cookies.subsections.types.list.essential.content"
                  )}
                </li>
                <li>
                  <strong>
                    {t(
                      "privacy.sections.cookies.subsections.types.list.analytics.title"
                    )}
                    :
                  </strong>{" "}
                  {t(
                    "privacy.sections.cookies.subsections.types.list.analytics.content"
                  )}
                </li>
                <li>
                  <strong>
                    {t(
                      "privacy.sections.cookies.subsections.types.list.functional.title"
                    )}
                    :
                  </strong>{" "}
                  {t(
                    "privacy.sections.cookies.subsections.types.list.functional.content"
                  )}
                </li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("privacy.sections.rights.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacy.sections.rights.content")}
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("privacy.sections.rights.list.item1")}</li>
                <li>{t("privacy.sections.rights.list.item2")}</li>
                <li>{t("privacy.sections.rights.list.item3")}</li>
                <li>{t("privacy.sections.rights.list.item4")}</li>
                <li>{t("privacy.sections.rights.list.item5")}</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("privacy.sections.changes.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacy.sections.changes.content")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t("privacy.sections.contact.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacy.sections.contact.content")}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/terms`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              <FileText className="mr-2 h-4 w-4" />
              {t("privacy.termsOfServiceLink")}
            </Link>
            <Link
              href={`/${lang}/bot-requirements`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              <Shield className="mr-2 h-4 w-4" />
              {t("privacy.botRequirementsLink")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
