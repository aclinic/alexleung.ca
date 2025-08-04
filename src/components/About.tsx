import Title from "@/components/Title";
import Skills from "@/components/Skills";
import Image from "next/image";

const About = () => {
  return (
    <section className="section-center pt-20">
      <Title title="About Me" />
      <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-x-16 md:pt-8">
        <div className="text-left leading-relaxed text-lg mb-8 md:w-[90%]">
          <p className="mb-6">
            I love applying effective software design to craft beautiful,
            compelling, and intuitive solutions to engineering problems. In my
            spare time I enjoy playing tennis 🎾, reading 📚, hiking 🏔️, rock
            climbing 🧗, and spending time with furmily 🐱.
          </p>

          <Skills />
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
    </section>
  );
};

export default About;
