import { PropsWithChildren } from "react";
import { JsonLd } from "react-schemaorg";

import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";

import { AppBackground } from "@/components/AppBackground";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SocialLinks from "@/components/SocialLinks";
import { BASE_URL } from "@/constants";
import { buildPersonSchema, buildWebsiteSchema } from "@/lib/seo";

import "./globals.css";

const title = "Alex Leung | Syntropy Engineer and Programmer, P.Eng.";
const description =
  "Personal website of Alex Leung, a Syntropy Engineer and Programmer, featuring writing on software, systems, and learning in public.";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords:
    "Alex Leung, Alexander Leung, Alexander Clayton Leung, Alex C Leung, Professional Engineer, P.Eng., PEO, Professional Engineers Ontario, licensed engineer, software engineer, product development, technical leadership, AI engineer, University of Waterloo, Georgia Tech, electrical engineering, distributed systems, embedded systems, full-stack developer, web development, artificial intelligence, aclinic, acl, aclyxpse, aclyx, yattaro, rootpanda, Ontario, California, Canada, United States, Waterloo, Toronto, San Francisco",
  authors: [{ name: "Alex Leung" }],
  creator: "Alex Leung",
  publisher: "Alex Leung",
  robots: "index, follow",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: title,
    description: description,
    type: "website",
    url: BASE_URL,
    siteName: "Alex Leung",
    locale: "en_CA",
    images: [
      {
        url: "/assets/alex_vibing.webp",
        width: 1536,
        height: 1024,
        alt: title,
      },
      {
        url: "/assets/screenshot.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [
      {
        url: "/assets/alex_vibing.webp",
        alt: title,
      },
      {
        url: "/assets/screenshot.png",
        alt: title,
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Alex Leung",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${lato.className} flex min-h-screen flex-col`}>
        <JsonLd item={buildPersonSchema({ description })} />
        <JsonLd item={buildWebsiteSchema({ description })} />
        <AppBackground />
        <Header />
        <SocialLinks />
        <main className="flex flex-grow flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
