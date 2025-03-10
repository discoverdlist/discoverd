"use client";

import { useTranslation } from "../../hooks/useTranslation";
import {
  Bot,
  Shield,
  AlertTriangle,
  Check,
  FileText,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function BotRequirements() {
  const { t, lang } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50 mb-8">
            <div className="bg-primary/10 dark:bg-primary/20 p-6 border-b border-gray-100 dark:border-gray-700/50">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <Bot className="h-7 w-7 mr-3 text-primary" />
                {t("botRequirements.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t("botRequirements.subtitle")}
              </p>
            </div>

            <div className="p-6 prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                {t("botRequirements.introduction")}
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                {t("botRequirements.sections.general.title")}
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border-l-4 border-red-500">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                    {t("botRequirements.sections.general.noMalicious.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {t("botRequirements.sections.general.noMalicious.content")}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                    <Check className="h-4 w-4 mr-2 text-blue-500" />
                    {t("botRequirements.sections.general.compliance.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {t("botRequirements.sections.general.compliance.content")}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t("botRequirements.sections.general.description.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {t("botRequirements.sections.general.description.content")}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                    {t("botRequirements.sections.general.permissions.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {t("botRequirements.sections.general.permissions.content")}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 flex items-center">
                <Bot className="h-5 w-5 mr-2 text-primary" />
                {t("botRequirements.sections.technical.title")}
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("botRequirements.sections.technical.list.item1")}</li>
                <li>{t("botRequirements.sections.technical.list.item2")}</li>
                <li>{t("botRequirements.sections.technical.list.item3")}</li>
                <li>{t("botRequirements.sections.technical.list.item4")}</li>
                <li>{t("botRequirements.sections.technical.list.item5")}</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                {t("botRequirements.sections.verification.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("botRequirements.sections.verification.content")}
              </p>
              <ol className="list-decimal pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("botRequirements.sections.verification.list.item1")}</li>
                <li>{t("botRequirements.sections.verification.list.item2")}</li>
                <li>{t("botRequirements.sections.verification.list.item3")}</li>
                <li>{t("botRequirements.sections.verification.list.item4")}</li>
              </ol>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                {t("botRequirements.sections.penalties.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("botRequirements.sections.penalties.content")}
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("botRequirements.sections.penalties.list.item1")}</li>
                <li>{t("botRequirements.sections.penalties.list.item2")}</li>
                <li>{t("botRequirements.sections.penalties.list.item3")}</li>
              </ul>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg mt-8">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                  {t("botRequirements.sections.disclaimer.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {t("botRequirements.sections.disclaimer.content")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/terms`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              <FileText className="mr-2 h-4 w-4" />
              {t("botRequirements.termsOfServiceLink")}
            </Link>
            <Link
              href={`/${lang}/privacy`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {t("botRequirements.privacyPolicyLink")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
