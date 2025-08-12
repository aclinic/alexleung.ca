import Title from "@/components/Title";
import Skills from "@/components/Skills";
import ExternalLink from "@/components/ExternalLink";
import Image from "next/image";

export default function About() {
  return (
    <section className="section-center pt-20">
      <Title title="About Me" />

      <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-x-16 md:pt-8">
        <div className="text-left leading-relaxed text-lg mb-8">
          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">🧍‍♂️</span>
            <p className="lg:text-lg leading-relaxed">
              I&apos;m a Software Engineer at{" "}
              <ExternalLink href="https://jetsonhome.com">Jetson</ExternalLink>,
              where we&apos;re focused on transforming homes across North
              America by replacing outdated, fossil-fueled systems with advanced
              electric heat pumps. Previously, I was a Staff Software Engineer
              at{" "}
              <ExternalLink href="https://arvr.google.com/">
                Google
              </ExternalLink>{" "}
              and served as a Tech Lead / Manager (TL/M) at both Google and{" "}
              <ExternalLink href="https://cash.app/">Cash App</ExternalLink>,
              building systems that span the full technology spectrum and
              leading cross-functional teams to deliver high-impact products.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">🎓</span>
            <p className="md:text-lg leading-relaxed">
              My journey started with a BASc from Waterloo and MSECE from
              Georgia Tech, beginning in power systems and control engineering
              at{" "}
              <ExternalLink href="https://www.gevernova.com/grid-solutions/">
                GE
              </ExternalLink>
              , then gradually moving up the stack - from hardware to firmware
              to native Android, web systems, and distributed systems. I have
              held a P.Eng. license from the PEO since 2017.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">🚀</span>
            <p className="md:text-lg leading-relaxed">
              As a technical leader, I&apos;ve architected and scaled
              distributed systems, led cross-functional product teams, and
              mentored engineers across multiple levels. I&apos;ve driven
              technical strategy and execution for large-scale platforms,
              managing both technical complexity and organizational alignment to
              deliver high-impact results.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">💻</span>
            <p className="md:text-lg leading-relaxed">
              My technical philosophy centers on getting things working first,
              then getting them right - so long as we avoid one-way doors. I
              believe in fast iteration and focusing on high-impact changes. I
              enjoy applying foundation models to solve hard problems. When
              approaching complex problems in an ambiguous domain, I seek to
              understand first, then decompose into manageable subproblems,
              explore the solution space, and move forward decisively even when
              information is limited.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">😍</span>
            <p className="md:text-lg leading-relaxed">
              What drives me is building things that people love, getting stuff
              done, and continuously learning new things. In my spare time I
              enjoy playing tennis 🎾, reading 📚, hiking 🏔️, rock climbing 🧗,
              and spending time with furmily 🐱.
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
          <Image
            src="/assets/about_alex_and_galactica.webp"
            alt="Alex Leung sitting with his cat Galactica, a relaxed moment showcasing their bond and Alex's love for his feline companion"
            width={400}
            height={400}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLDSEsAy2kZTNL4a4VNPgABNVMm1kEhQXEmQr/AMHkABFxXjQW0iyRwwq"
          />
        </div>
      </div>

      <Skills className="mt-12" />
    </section>
  );
}
