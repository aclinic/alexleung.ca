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
      <section aria-labelledby="positioning-heading" className="pb-16">
        <div className="section-center">
          <div className="max-w-3xl rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm md:p-8">
            <h2 id="positioning-heading" className="text-heading font-semibold">
              What you&apos;ll find here
            </h2>
            <p className="text-body mt-4 text-gray-200">
              I focus on building thoughtful software systems and sharing ideas
              that help teams build with clarity.
            </p>
            <p className="text-body mt-3 text-gray-200">
              Most posts cover software architecture, product engineering, and
              practical lessons from learning in public.
            </p>
            <p className="text-body mt-3 text-gray-200">
              Expect concise writing, high-level perspectives, and useful notes
              you can apply in your own work.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
