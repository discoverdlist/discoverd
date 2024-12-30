/* eslint-disable @next/next/no-async-client-component */
'use client';
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: auth } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    if (auth) {
        return (
            <nav>
                <div className="navbar flex flex-wrap items-center justify-between mx-auto p-4 mt-4 relative">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image className="navbarlogo" src="/assets/logo.png" width="64" height="64" alt="Discord List" />
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                        {/* Botão de Dropdown */}
                        <button onClick={toggleDropdown}>
                            <Image className="avatar" src={auth.session.user.image} width="40" height="40" alt={auth.session.user.name} />
                        </button>

                        {/* Dropdown */}
                        <div className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg mt-2 shadow w-44 absolute top-full left-0 dark:bg-gray-700`}>
                            <ul>
                                <li>
                                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Perfil</Link>
                                </li>
                                <li>
                                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Configurações</Link>
                                </li>
                                <li>
                                    <Link href="/bots/add" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Adicionar bot</Link>
                                </li>
                                <li>
                                    <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Sair</button>
                                </li>
                            </ul>
                        </div>

                        {/* Menu Mobile */}
                        <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden">
                            <span className="sr-only">Abrir Menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    {/* Links de Navegação */}
                    <div className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                            <li>
                                <Link href="#" className="md:text-white block py-2 px-3 text-white rounded md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Início</Link>
                            </li>
                            <li>
                                <Link href="#" className="md:text-white block py-2 px-3 text-white rounded md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent dark:border-gray-700">Explorar</Link>
                            </li>
                            <li>
                                <Link href="#" className="md:text-white block py-2 px-3 text-white rounded md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent dark:border-gray-700">Parceiros</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image className="navbarlogo" src="/assets/logo.png" width="64" height="64" alt="Discord List" />
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" onClick={() => signIn('discord')} className="loginbutton text-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 text-center">
                            <FontAwesomeIcon className="dcicon" width="20" height="20" icon={faDiscord} />&nbsp;Entrar com Discord
                        </button>
                    </div>
                </div>
            </nav>
        )
    }
}
