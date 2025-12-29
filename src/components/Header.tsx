"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href: string) => {
    // Exact match for home page
    if (href === "/") return pathname === "/";
    // Hash links are active when on home page
    if (href.startsWith("/#")) return pathname === "/";
    // For other pages, check exact match (with or without trailing slash)
    return pathname === href || pathname === href.replace(/\/$/, "");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 h-[var(--header-height)]">
      <nav className="w-[90vw] max-w-content mx-auto h-full flex justify-between items-center">
        {/* Logo/Name */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-lg md:text-2xl font-black uppercase tracking-wider hover:text-gray-300 transition-colors relative z-50"
        >
          Alex Leung
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-lg hover:text-gray-300 transition-colors ${
                  isActive(link.href)
                    ? "text-white font-semibold"
                    : "text-gray-400"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl hover:text-gray-300 transition-colors relative z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          {/* Menu */}
          <div className="md:hidden fixed top-[var(--header-height)] left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10">
            <ul className="flex flex-col py-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`block px-8 py-4 text-xl hover:bg-white/5 transition-all ${
                      isActive(link.href)
                        ? "text-white font-semibold bg-white/10"
                        : "text-gray-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
