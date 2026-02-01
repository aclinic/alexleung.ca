import Image from "next/image";

import ExternalLink from "@/components/ExternalLink";
import { Subtitle } from "@/components/Subtitle";

export function Journey() {
  return (
    <section className="section-center">
      <Subtitle title="My Background" id="background" />

      <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-x-16 md:pt-8">
        <div className="text-md mb-8 text-left leading-relaxed lg:text-lg">
          <div className="mb-6 flex items-start gap-3">
            <span className="mt-1 flex-shrink-0 text-xl">👋</span>
            <p className="leading-relaxed">
              Hi! I&apos;m Alex, and I&apos;m so glad you&apos;re here!
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="mt-1 flex-shrink-0 text-xl">💼</span>
            <p className="leading-relaxed">
              Currently, I&apos;m at{" "}
              <ExternalLink href="https://jetsonhome.com">Jetson</ExternalLink>,
              electrifying North American homes with vertically integrated
              energy solutions. My previous experience includes developing AR/AI
              Glasses at{" "}
              <ExternalLink href="https://arvr.google.com/">
                Google
              </ExternalLink>{" "}
              and driving product engineering initiatives at{" "}
              <ExternalLink href="https://cash.app/">Cash App</ExternalLink>.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="mt-1 flex-shrink-0 text-xl">🚀</span>
            <p className="leading-relaxed">
              I build products from 0-1 and scale them from 1-100. My background
              spans distributed systems, embedded systems, and AI. My approach is
              simple: <strong>Prioritize momentum, then optimize for scale.</strong>
              I lean into ambiguity, decomposing large-scale challenges into actionable
              technical roadmaps that keep teams aligned and moving fast.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="mt-1 flex-shrink-0 text-xl">❤️</span>
            <p className="leading-relaxed">
              What drives me is building things people love, getting stuff done,
              and continuously learning. In my spare time, I enjoy playing
              tennis 🎾, reading 📚, hiking 🏔️, rock climbing 🧗, and spending
              time with furmily 🐱.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <Image
            src="/assets/about_portrait_mountain.webp"
            alt="Alex Leung on a scenic mountain overlook, enjoying the outdoors and mountain views during a hiking adventure"
            width={400}
            height={267}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLDSEsAy2kZTNL4a4VNPgABNVMm1kEhQXEmQr/AMHkABFxXjQW0iyRwwq"
          />
          <Image
            src="/assets/about_portrait.webp"
            alt="Alex Leung standing on a mountain trail during a hiking adventure, wearing outdoor gear and smiling at the camera"
            width={400}
            height={400}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLDSEsAy2kZTNL4a4VNPgABNVMm1kEhQXEmQr/AMHkABFxXjQW0iyRwwq"
          />
        </div>
      </div>
    </section>
  );
}
