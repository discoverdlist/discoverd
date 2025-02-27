import Link from "next/link";
import { GitlabIcon as GitHub, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Image className="h-10" src="/assets/logo.png" alt="Discord List" />
            <p className="text-gray-400 text-base">
              Descubra os melhores bots para o seu servidor Discord.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <GitHub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Navegação
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/"
                      className="text-base text-gray-400 hover:text-gray-300"
                    >
                      Início
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/explore"
                      className="text-base text-gray-400 hover:text-gray-300"
                    >
                      Explorar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/partners"
                      className="text-base text-gray-400 hover:text-gray-300"
                    >
                      Parceiros
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Suporte
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/faq"
                      className="text-base text-gray-400 hover:text-gray-300"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-base text-gray-400 hover:text-gray-300"
                    >
                      Contato
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-base text-gray-400 hover:text-gray-300"
                    >
                      Termos de Uso
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Discord List. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
