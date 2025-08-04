'use client';

import { useEffect } from "react";
import useDarkMode from "@/components/colour-theme/useDarkMode";
import Home from "@/components/Home";
import About from "@/components/About";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Toggle from "@/components/colour-theme/Toggler";

export default function Page() {
  const [theme, themeToggler, isLoadingTheme] = useDarkMode();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (isLoadingTheme) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white transition-all duration-500 ease-linear min-h-screen">
      <Toggle toggleTheme={themeToggler} theme={theme} />
      <SocialLinks />
      <Home />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
