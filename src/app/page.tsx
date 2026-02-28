"use client";

import { useEffect } from "react";
import { JsonLd } from "react-schemaorg";

import type { WebPage } from "schema-dts";

import { Hero } from "@/components/Hero";
import { buildHomePageSchema } from "@/lib/seo";

const title = "Alex Leung | Syntropy Engineer and Programmer, P.Eng.";
const description =
  "Alex Leung is a Syntropy Engineer and Programmer writing about software systems, AI engineering, and learning in public.";
const path = "/";

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
      <JsonLd<WebPage>
        item={buildHomePageSchema({
          path,
          title,
          description,
        })}
      />
      <Hero />
    </>
  );
}
