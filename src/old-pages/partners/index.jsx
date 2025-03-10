"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Bot, Server, Users, Shield } from "lucide-react";

export default function PartnersPage() {
  const partners = [
    {
      name: "SquareCloud",
      logo: "/squarecloud.png",
      description:
        "Plataforma de hospedagem especializada em bots Discord e aplicações Node.js",
      benefits: [
        "Hospedagem gratuita para bots pequenos",
        "Painel de controle intuitivo",
        "Suporte 24/7",
        "Proteção contra ataques DDoS",
      ],
      link: "https://squarecloud.app/",
      type: "hosting",
    },
    // Add more partners here
  ];

  const PartnerCard = ({ partner }) => {
    const icons = {
      hosting: Server,
      community: Users,
      security: Shield,
    };

    const Icon = icons[partner.type] || Bot;

    return (
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300">
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-48 h-16 mb-4">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {partner.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {partner.description}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {partner.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <Icon className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          <a
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
          >
            Visitar site
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nossos Parceiros
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Conheça as empresas que tornam nossa plataforma possível
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>

          <div className="mt-16 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-100 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quer se tornar um parceiro?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Entre em contato conosco e descubra os benefícios de ser um
              parceiro oficial da nossa plataforma.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              Entre em contato
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
