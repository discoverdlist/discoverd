"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,
  PlusCircle,
} from "lucide-react";

export default function Navbar() {
  const { data: auth } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                className="h-8 w-8"
                src="/assets/logo.png"
                width={32}
                height={32}
                alt="Discord List"
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Início
                </Link>
                <Link
                  href="/explore"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Explorar
                </Link>
                <Link
                  href="/partners"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Parceiros
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {auth ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center max-w-xs bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={auth.session.user.image || "/placeholder.svg"}
                      width={32}
                      height={32}
                      alt={auth.session.user.name}
                    />
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="mr-3 h-5 w-5 text-gray-400" /> Perfil
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="mr-3 h-5 w-5 text-gray-400" />{" "}
                        Configurações
                      </Link>
                      <Link
                        href="/bots/add"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <PlusCircle className="mr-3 h-5 w-5 text-gray-400" />{" "}
                        Adicionar bot
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-3 h-5 w-5 text-gray-400" /> Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => signIn("discord")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Entrar com Discord
                </button>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Início
            </Link>
            <Link
              href="/explore"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Explorar
            </Link>
            <Link
              href="/partners"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Parceiros
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {auth ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={auth.session.user.image || "/placeholder.svg"}
                    width={40}
                    height={40}
                    alt={auth.session.user.name}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none">
                    {auth.session.user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {auth.session.user.email}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={() => signIn("discord")}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Entrar com Discord
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
