"use client";

import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DesktopNav, MobileNavDrawer } from "@/components/NavMenu";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu when resizing to desktop width
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (mediaQuery.matches && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [isMenuOpen]);

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
    <>
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
          <DesktopNav isActive={isActive} />

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="relative z-50 text-2xl transition-all duration-300 hover:text-gray-300 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </span>
          </button>
        </nav>
      </header>

      <MobileNavDrawer
        isOpen={isMenuOpen}
        isActive={isActive}
        onClose={closeMenu}
      />
    </>
  );
}
