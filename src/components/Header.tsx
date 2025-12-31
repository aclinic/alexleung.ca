"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/now/", label: "Now" },
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
    <header className="fixed left-0 right-0 top-0 z-50 h-[var(--header-height)] border-b border-white/10 bg-black/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-full w-[90vw] max-w-content items-center justify-between">
        {/* Logo/Name */}
        <Link
          href="/"
          onClick={closeMenu}
          className="relative z-50 text-lg font-black uppercase tracking-wider transition-colors hover:text-gray-300 md:text-2xl"
        >
          Alex Leung
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link ${
                  isActive(link.href)
                    ? "nav-link--active"
                    : "nav-link--inactive"
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
          className="relative z-50 text-2xl transition-colors hover:text-gray-300 md:hidden"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
          />
          {/* Menu */}
          <div className="fixed left-0 right-0 top-[var(--header-height)] border-b border-white/10 bg-black/95 backdrop-blur-md md:hidden">
            <ul className="flex flex-col py-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`mobile-nav-link ${
                      isActive(link.href)
                        ? "mobile-nav-link--active"
                        : "mobile-nav-link--inactive"
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
