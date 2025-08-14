"use client";

import { useEffect } from "react";
import Home from "@/components/Home";
import About from "@/components/About";
import Credentials from "@/components/Credentials";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export default function Page() {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 h-screen bg-[url('/assets/background.webp')] bg-cover bg-center bg-no-repeat -z-10 after:absolute after:inset-0 after:bg-black/50"></div>
      <div className="text-white min-h-screen">
        <SocialLinks />
        <Home />
        <About />
        <Credentials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
