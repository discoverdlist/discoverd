import Link from "next/link";
import {
  GitlabIcon as GitHub,
  Twitter,
  DiscIcon as Discord,
  Heart,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] z-0"></div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <Image
                className="h-10 w-10"
                src="/assets/logo.png"
                width={40}
                height={40}
                alt="Logo da Discoverd"
              />
              <span className="ml-2 text-xl font-bold">Discoverd</span>
            </div>
            <p className="text-gray-400 text-base">
              Descubra os melhores bots para o seu servidor Discord.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                aria-label="GitHub"
              >
                <GitHub className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                aria-label="Discord"
              >
                <Discord className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Navegação
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Explorar
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Parceiros
                </Link>
              </li>
              <li>
                <Link
                  href="/bots/add"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Adicionar Bot
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Suporte
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Inscreva-se
            </h3>
            <p className="text-gray-400 mb-4">
              Receba as últimas novidades sobre bots e atualizações.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="px-4 py-2 bg-white/5 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Discoverd. Todos os direitos
              reservados.
            </p>
            <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
              Feito com <Heart className="h-4 w-4 text-red-500 mx-1" /> no
              Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
