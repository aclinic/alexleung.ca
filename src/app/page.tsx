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
  const [theme, themeToggler] = useDarkMode();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
