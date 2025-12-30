import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { WebPage } from "schema-dts";
import { Journey } from "@/app/about/_components/Background";
import { Credentials } from "@/app/about/_components/Credentials";
import { Title } from "@/components/Title";
import { Skills } from "./_components/TechnicalInterests";

const title = "About Me | Alex Leung";
const description =
  "Learn about Alex Leung's journey as a Staff Software Engineer, Engineering Lead, and P.Eng. - from University of Waterloo and Georgia Tech to building distributed systems and AI solutions.";
const url = "https://alexleung.ca/about/";

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: title,
    description: description,
    type: "website",
    url: url,
    siteName: "Alex Leung",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd<WebPage>
        item={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": url,
          url: url,
          name: title,
          description: description,
          mainEntity: {
            "@type": "Person",
            "@id": "https://alexleung.ca/#person",
          },
          inLanguage: "en-CA",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://alexleung.ca/#website",
          },
        }}
      />

      <div className="py-[var(--header-height)]">
        <Title title="About Me" id="about" />
        <Journey />
        <Skills className="mt-12" />
        <Credentials />
      </div>
    </>
  );
}
