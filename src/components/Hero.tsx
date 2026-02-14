import { FcEngineering } from "react-icons/fc";
import { HiOutlineArrowRight, HiOutlineUser } from "react-icons/hi";

import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section
      id="home"
      className="flex flex-grow items-center justify-center py-12"
    >
      <div className="section-center">
        <div>
          <div
            className="animate-showTopText opacity-0"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <p className="text-hero-subtitle mb-4 tracking-wider">
              Hi, my name is
            </p>
            <h1 className="text-hero-title mb-4 inline-block font-black uppercase leading-[0.9] tracking-[0.2rem] md:pb-4">
              Alex Leung
            </h1>
          </div>
          <div
            className="animate-showTopText opacity-0"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <h2 className="text-hero-description">
              Syntropy Engineer | Programmer | P.Eng.{" "}
              <FcEngineering className="mb-1 ml-1 inline-block align-middle" />
            </h2>
            <p className="mt-3 text-sm italic text-gray-400">
              Engineer writing about software, systems, and learning in public.
            </p>
          </div>
          <div
            className="mt-8 flex animate-showTopText flex-wrap gap-4 opacity-0"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <CTAButton href="/blog/">
              Read My Blog <HiOutlineArrowRight className="text-lg" />
            </CTAButton>
            <CTAButton href="/about/" variant="secondary">
              <HiOutlineUser className="text-lg" /> About Me
            </CTAButton>
          </div>
          <section
            aria-labelledby="positioning-heading"
            className="mt-10 max-w-3xl animate-showTopText rounded-xl border border-white/10 bg-black/20 p-6 opacity-0 backdrop-blur-sm md:p-8"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
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
          </section>
        </div>
      </div>
    </section>
  );
}
