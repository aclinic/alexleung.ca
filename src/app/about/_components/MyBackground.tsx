import Image from "next/image";

import ExternalLink from "@/components/ExternalLink";
import { IconTextRow } from "@/components/IconTextRow";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { SectionBlock } from "@/components/SectionBlock";

export function Journey() {
  return (
    <ResponsiveContainer element="section">
      <SectionBlock title="My Background" titleId="background" spacing="lg">
        <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-x-16 md:pt-8">
          <div className="text-md mb-8 space-y-6 text-left lg:text-lg">
            <IconTextRow icon="👋" title="Hello" contentClassName="space-y-0">
              <p>Hi! I&apos;m Alex, and I&apos;m glad you&apos;re here.</p>
            </IconTextRow>

            <IconTextRow icon="💼" title="What I Do">
              <p>
                I&apos;m currently at{" "}
                <ExternalLink href="https://jetsonhome.com">
                  Jetson
                </ExternalLink>
                , helping electrify North American homes with vertically
                integrated energy solutions.
              </p>
              <p>
                Before that, I worked on AR/AI glasses at{" "}
                <ExternalLink href="https://arvr.google.com/">
                  Google
                </ExternalLink>{" "}
                and product engineering at{" "}
                <ExternalLink href="https://cash.app/">Cash App</ExternalLink>.
              </p>
            </IconTextRow>

            <IconTextRow icon="🚀" title="How I Work">
              <p>I build products from 0→1 and help scale them from 1→100.</p>
              <p>
                My background spans distributed systems, embedded systems, and
                AI. My approach is simple:{" "}
                <strong>prioritize momentum, then optimize for scale.</strong>
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>Lean into ambiguity</li>
                <li>Break large problems into clear roadmaps</li>
                <li>Keep teams aligned and shipping</li>
              </ul>
            </IconTextRow>

            <IconTextRow icon="❤️" title="Outside Work">
              <p>
                I&apos;m motivated by building useful things, getting meaningful
                work done, and learning continuously.
              </p>
              <p>
                Outside of work, I spend time playing tennis 🎾, reading 📚,
                hiking 🏔️, rock climbing 🧗, and hanging out with my furmily 🐱.
              </p>
            </IconTextRow>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <Image
              src="/assets/about_portrait.webp"
              alt="Alex Leung sitting on a mountain trail during a hiking adventure"
              width={400}
              height={400}
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLDSEsAy2kZTNL4a4VNPgABNVMm1kEhQXEmQr/AMHkABFxXjQW0iyRwwq"
            />
          </div>
        </div>
      </SectionBlock>
    </ResponsiveContainer>
  );
}
