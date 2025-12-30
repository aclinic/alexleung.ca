import ExternalLink from "@/components/ExternalLink";
import Image from "next/image";
import { Subtitle } from "@/components/Subtitle";

export function Journey() {
  return (
    <section className="section-center">
      <Subtitle title="My Background" id="background" />

      <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-x-16 md:pt-8">
        <div className="text-left leading-relaxed text-md lg:text-lg mb-8">
          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">🧍‍♂️</span>
            <p className="leading-relaxed">
              Currently, I&apos;m at{" "}
              <ExternalLink href="https://jetsonhome.com">Jetson</ExternalLink>,
              electrifying North American homes with vertically integrated
              energy solutions. My previous experience spans developing AR/AI
              hardware at{" "}
              <ExternalLink href="https://arvr.google.com/">
                Google
              </ExternalLink>{" "}
              and driving product engineering initiatives at{" "}
              <ExternalLink href="https://cash.app/">Cash App</ExternalLink>.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">🚀</span>
            <p className="leading-relaxed">
              I specialize in building and scaling distributed systems that
              serve millions of users. My leadership philosophy is simple: make
              it work, then make it right. I’ve led cross-functional teams of up
              to 15 engineers, focusing on fast iteration, high-impact changes,
              and the strategic use of AI to solve complex problems. I thrive in
              ambiguity by decomposing large-scale challenges into actionable
              paths, ensuring both technical excellence and organizational
              alignment.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">😍</span>
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
