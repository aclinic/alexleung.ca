"use client";

import { useEffect } from "react";
import { Hero } from "@/components/Hero";

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
      <Hero />
    </>
  );
}
