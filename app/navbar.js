'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";

export function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full relative">
      <nav className="bg-[rgba(217,55,53,0.97)]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/brasao-bombeiros.png" width={32} height={32} alt="bombeiros-logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Hidrante Fácil - Canoas</span>
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-red-700"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="bg-[rgba(217,55,53,0.97)] text-white font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <Link href="/contatos" className="block py-2 px-3 rounded hover:bg-red-700">
                  Hidrantes
                </Link>
              </li>
              {isAuthenticated && isAdmin && (
                <li>
                  <Link href="/usuarios" className="block py-2 px-3 rounded hover:bg-red-700">
                    Usuários
                  </Link>
                </li>
              )}
              <li>
                <Link href="/ajuda" className="block py-2 px-3 rounded hover:bg-red-700">
                  Ajuda
                </Link>
              </li>
              {!isAuthenticated ? (
                <li>
                  <Link href="/login" className="block py-2 px-3 rounded hover:bg-red-700">
                    Login
                  </Link>
                </li>
              ) : (
                <li>
                  <button onClick={handleLogout} className="block py-2 px-3 rounded hover:bg-red-700 ">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  );
}
