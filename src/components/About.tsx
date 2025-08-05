import Title from "@/components/Title";
import Skills from "@/components/Skills";
import Image from "next/image";

const About = () => {
  return (
    <section className="section-center pt-20">
      <Title title="About Me" />

      <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-x-16 md:pt-8">
        <div className="text-left leading-relaxed text-lg mb-8">
          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">🧍‍♂️</span>
            <p className="text-lg leading-relaxed">
              I&apos;m a Software Engineer at Jetson, where we&apos;re focused
              on transforming homes across North America by replacing outdated,
              fossil-fueled systems with advanced electric heat pumps.
              Previously, I&apos;ve worked at Google, Cash App, and
              North/Thalmic Labs, building systems that span the full technology
              spectrum. I&apos;ve also served as a hands-on front-line technical
              manager and cross-functional lead.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">🎓</span>
            <p className="text-lg leading-relaxed">
              My journey started with a BASc from Waterloo and MSEE from Georgia
              Tech, beginning in power systems and control engineering at GE,
              then gradually moving up the stack - from hardware to firmware to
              native Android, web systems, and distributed systems.
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <span className="text-xl mt-1 flex-shrink-0">💻</span>
            <p className="text-lg leading-relaxed">
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
            <p className="text-lg leading-relaxed">
              What drives me is building things that people love, getting stuff
              done, and continuously learning new things. In my spare time I
              enjoy playing tennis 🎾, reading 📚, hiking 🏔️, rock climbing 🧗,
              and spending time with furmily 🐱.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
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

      <Skills />
    </section>
  );
};

export default About;
