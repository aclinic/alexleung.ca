"use client";

import Home from "@/components/Home";
import About from "@/components/About";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <div className="bg-black text-white min-h-screen bg-[url('/assets/background.webp')] bg-cover bg-center bg-fixed bg-no-repeat bg-overlay">
      <SocialLinks />
      <Home />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
